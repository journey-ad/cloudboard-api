"use client";

import { IconLink } from '@tabler/icons-react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
}

export default function Link({ href, children, isExternal = false, className = "", ...props }: LinkProps) {
  return (
    <a
      className={`text-[0.9em] align-top border-b border-dashed border-black dark:border-white pb-0.5 transition-all duration-200 hover:font-bold hover:text-cyan-500 hover:border-cyan-500 ${className}`}
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {isExternal && <IconLink className="inline mr-0.5" stroke={2} size="1.2em" />}
      {children}
    </a>
  );
}; 
