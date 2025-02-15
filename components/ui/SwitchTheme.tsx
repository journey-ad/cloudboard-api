"use client";

import { useTheme } from "next-themes";
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from "react";

export default function SwitchTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <IconSun stroke={2} />;

  return (
    <div>
      <button
        type="button"
        className="flex justify-center items-center rounded-md cursor-pointer transition-all text-foreground"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <IconSun stroke={2} /> : <IconMoon stroke={2} />}
      </button>
    </div>
  );
}
