#!/usr/bin/env bash
# Installs the tools this repo needs on a fresh Ubuntu machine.
# Each tool: install if missing, then print its version. Safe to re-run.
set -euo pipefail

NODE_MAJOR=22
NPM_MAJOR=11
export NVM_DIR="$HOME/.nvm"

CYAN=$'\033[0;36m' RESET=$'\033[0m'
printVersion() { printf "${CYAN}%-8s${RESET}%s\n" "$1" "$2"; }

ensureUbuntu() {
  if [ ! -r /etc/os-release ]; then
    echo "This setup must run on Ubuntu (native or WSL). Aborting." >&2
    exit 1
  fi
  local distroId
  distroId="$(. /etc/os-release && echo "$ID")"
  if [ "$distroId" != "ubuntu" ]; then
    echo "This setup must run on Ubuntu, but detected '$distroId'. Aborting." >&2
    exit 1
  fi
  if grep -qiE "(microsoft|wsl)" /proc/version 2>/dev/null; then
    printVersion "os" "Ubuntu on WSL"
  else
    printVersion "os" "Ubuntu"
  fi
}

ensureAptPackage() {
  command -v "$1" >/dev/null && return
  sudo apt-get update -y -qq
  sudo apt-get install -y -qq "$1"
}

setupGit() {
  ensureAptPackage git
  printVersion "git" "$(git --version)"
}

setupCurl() {
  ensureAptPackage curl
  printVersion "curl" "$(curl --version | head -n1)"
}

setupNvm() {
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    local latest
    latest="$(curl -fsSL https://api.github.com/repos/nvm-sh/nvm/releases/latest | grep -oP '"tag_name":\s*"\K[^"]+')"
    curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/$latest/install.sh" | bash
  fi
  \. "$NVM_DIR/nvm.sh"
  printVersion "nvm" "$(nvm --version)"
}

setupNode() {
  if ! command -v node >/dev/null || [ "$(node -v | tr -d v | cut -d. -f1)" -lt "$NODE_MAJOR" ]; then
    nvm install "$NODE_MAJOR" >/dev/null
    nvm alias default "$NODE_MAJOR" >/dev/null
  fi
  printVersion "node" "$(node -v)"
}


setupNpm() {
  if [ "$(npm -v | cut -d. -f1)" -lt "$NPM_MAJOR" ]; then
    npm install -g "npm@$NPM_MAJOR" >/dev/null
  fi
  printVersion "npm" "$(npm -v)"
}

main() {
  ensureUbuntu
  setupGit
  setupCurl
  setupNvm
  setupNode
  setupNpm
}

main
