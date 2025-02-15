"use client";

import { useRef, useState, RefObject } from "react";
import { useOnClickOutside } from 'usehooks-ts'
import { locales, defaultLocale } from "@/i18n/config";
import { Cookie } from "@/lib/utils";
import { clsx } from "clsx";
import { IconLanguageHiragana } from '@tabler/icons-react';

export default function SwitchLang() {
  const cookieLocale =
    typeof window !== "undefined" ? Cookie.get("NEXT_LOCALE") : null;
  const browserLocale =
    typeof window !== "undefined" ? navigator.language : null;

  const locale = cookieLocale || browserLocale || defaultLocale;
  const [lang, setlang] = useState(new Set([locale]));
  const [open, setOpen] = useState(false);

  const handleChangeLocale = (key: Set<string>) => {
    setlang(key);
    Cookie.set("NEXT_LOCALE", Array.from(key)[0], {
      path: "/",
      expires: 365,
    });

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

  return (
    <div className={`relative inline-block text-left`} ref={ref}>
      <div>
        <button
          type="button"
          className="flex justify-center items-center rounded-md cursor-pointer transition-all text-foreground"
          onClick={() => setOpen((prev) => !prev)}
        >
          <IconLanguageHiragana stroke={2} />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-max max-w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5">
          <div className="flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.entries(locales).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleChangeLocale(new Set([key]))}
                className={clsx(
                  "flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700",
                  lang.has(key) ? 'bg-gray-200 dark:bg-slate-600' : ''
                )}
                role="menuitem"
              >
                <span className="min-w-8 text-[0.8em] mr-2">{key}</span>
                <span className="text-left">{value}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};