"use client";

import { usePathname } from "next/navigation";
import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";

type MobileMenuProps = {
  children: ReactNode;
  label: string;
};

export function MobileMenu({ children, label }: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  };

  return (
    <details className="mobile-menu" ref={detailsRef}>
      <summary>
        {label}
        <span aria-hidden="true">+</span>
      </summary>
      <div className="mobile-menu__panel" onClick={handlePanelClick}>
        {children}
      </div>
    </details>
  );
}
