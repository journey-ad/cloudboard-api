import { getRequestConfig, RequestConfig } from "next-intl/server";
import * as NextHeaders from "next/headers";
import { AbstractIntlMessages } from "next-intl";
import { mergeDeep } from "@/lib/utils";

import { defaultLocale } from "./config"

// eslint-disable-next-line
export default getRequestConfig(async (): Promise<RequestConfig> => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  const getBrowserLocale = async () => {
    let locale = (await NextHeaders.headers()).get("accept-language") ?? "";

    locale = locale?.split(",")[0];

    if (!locale.startsWith("zh")) {
      locale = locale.split("-")[0];
    }

    return locale;
  }

  const getCookieLocale = async () => {
    const locale = (await NextHeaders.cookies()).get("NEXT_LOCALE")?.value;

    return locale;
  }

  const [cookieLocale, browserLocale] = await Promise.all([getCookieLocale(), getBrowserLocale()]);

  const locale = cookieLocale || browserLocale || defaultLocale;

  const defaultLocaleFile = (await import(`./locales/${defaultLocale}.json`))
    .default;

  if (!defaultLocaleFile) {
    throw new Error("Default locale file not found");
  }

  try {
    const localeFile = (await import(`./locales/${locale}.json`)).default;

    const localeMessages = mergeDeep(defaultLocaleFile, localeFile) as AbstractIntlMessages;

    return {
      locale,
      messages: localeMessages,
    };
  } catch (error) {
    console.error(error);

    return {
      locale: defaultLocale,
      messages: defaultLocaleFile,
    };
  }
});
