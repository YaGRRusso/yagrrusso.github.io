"use client";

import "@/styles/globals.css";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <html className={cn("theme-original dark", ...fontVariables)} lang="en">
      <body className="flex min-h-screen flex-col justify-center bg-background text-foreground">
        <div className="container flex w-full flex-col gap-4">
          <SectionTitle
            description="This page could not be found"
            id="not-found"
            title="404"
          />
          <p className="text-muted-foreground">
            The link may be broken, or the page may have moved.
          </p>
          <Button asChild className="self-start">
            <a href="/">
              Go to the home page
              <ArrowRightIcon weight="bold" />
            </a>
          </Button>
        </div>
      </body>
    </html>
  );
}
