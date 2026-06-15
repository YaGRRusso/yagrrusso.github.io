import { useLocale } from "next-intl";

type MessageProps<T = Record<string, string>> = {
  locale: string;
  messages: T;
};

export function useMessages() {
  const locale = useLocale();

  return <T>(messages: MessageProps<T>[] | null | undefined) => {
    if (!messages) return;
    const message = messages.find((msg) => msg.locale === locale);
    return message?.messages as T;
  };
}
