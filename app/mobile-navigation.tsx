"use client";

import { useEffect, useRef, useState } from "react";

type MobileNavigationProps = {
  emailHref: string;
};

export function MobileNavigation({ emailHref }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 1081px)");
    const handleBreakpointChange = () => {
      if (desktopBreakpoint.matches) {
        setOpen(false);
      }
    };

    if (typeof desktopBreakpoint.addEventListener === "function") {
      desktopBreakpoint.addEventListener("change", handleBreakpointChange);
      return () => {
        desktopBreakpoint.removeEventListener("change", handleBreakpointChange);
      };
    }

    desktopBreakpoint.addListener(handleBreakpointChange);
    return () => {
      desktopBreakpoint.removeListener(handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        className="mobile-menu-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        data-mobile-menu-trigger
        onClick={() => setOpen((current) => !current)}
      >
        <span className="mobile-menu-icon" aria-hidden="true" />
        <span>Menu</span>
      </button>

      <nav
        ref={panelRef}
        className="mobile-menu-panel"
        id="mobile-menu-panel"
        aria-label="Navegação móvel"
        data-mobile-menu-panel
        hidden={!open}
      >
        <div className="mobile-menu-grid">
          <a className="mobile-menu-link" href="#problema" onClick={closeMenu}>
            Desafios
          </a>
          <a className="mobile-menu-link" href="#como-ajudamos" onClick={closeMenu}>
            Soluções
          </a>
          <a className="mobile-menu-link" href="#metodo" onClick={closeMenu}>
            Método
          </a>
          <a className="mobile-menu-link" href="#faq" onClick={closeMenu}>
            Perguntas
          </a>
        </div>

        <a className="mobile-menu-email" href={emailHref} onClick={closeMenu}>
          <span className="contact-icon contact-icon--email" aria-hidden="true" />
          <span>Enviar e-mail</span>
        </a>
      </nav>
    </>
  );
}
