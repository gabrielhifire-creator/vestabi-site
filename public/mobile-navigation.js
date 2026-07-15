(() => {
  const initializeMobileNavigation = () => {
    const header = document.querySelector("[data-mobile-navigation]");
    const trigger = header?.querySelector("[data-mobile-menu-trigger]");
    const panel = header?.querySelector("[data-mobile-menu-panel]");

    if (!header || !trigger || !panel || header.dataset.mobileNavigationReady) {
      return;
    }

    header.dataset.mobileNavigationReady = "true";

    const isOpen = () => trigger.getAttribute("aria-expanded") === "true";

    const setOpen = (open, restoreFocus = false) => {
      trigger.setAttribute("aria-expanded", String(open));
      trigger.setAttribute(
        "aria-label",
        open ? "Fechar menu de navegação" : "Abrir menu de navegação",
      );
      panel.hidden = !open;

      if (!open && restoreFocus) {
        trigger.focus();
      }
    };

    trigger.addEventListener("click", () => {
      setOpen(!isOpen());
    });

    panel.addEventListener("click", (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("a")
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (
        isOpen() &&
        event.target instanceof Node &&
        !header.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false, true);
      }
    });

    const desktopBreakpoint = window.matchMedia("(min-width: 1081px)");
    const handleBreakpointChange = () => {
      if (desktopBreakpoint.matches) {
        setOpen(false);
      }
    };

    if (typeof desktopBreakpoint.addEventListener === "function") {
      desktopBreakpoint.addEventListener("change", handleBreakpointChange);
    } else {
      desktopBreakpoint.addListener(handleBreakpointChange);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMobileNavigation, {
      once: true,
    });
  } else {
    initializeMobileNavigation();
  }
})();
