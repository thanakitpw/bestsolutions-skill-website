"use client";

import { useEffect } from "react";

/* Progressive-enhancement behaviors, ported from the static site's main.js:
   mobile nav, accordions, navbar-on-scroll, reveal-on-scroll. */
export function Interactions() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // ---- Mobile nav ----
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navmenu");
    if (toggle && menu) {
      const setOpen = (open: boolean) => {
        menu.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
      };
      const onToggle = () => setOpen(!menu.classList.contains("open"));
      toggle.addEventListener("click", onToggle);
      cleanups.push(() => toggle.removeEventListener("click", onToggle));
      menu.querySelectorAll("a").forEach((a) => {
        const h = () => setOpen(false);
        a.addEventListener("click", h);
        cleanups.push(() => a.removeEventListener("click", h));
      });
    }

    // ---- Accordions ----
    const openP = (btn: Element, panel: HTMLElement) => {
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    };
    const closeP = (btn: Element, panel: HTMLElement) => {
      btn.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = "";
    };
    document.querySelectorAll("[data-accordion]").forEach((group) => {
      const single = group.hasAttribute("data-single");
      const triggers = Array.from(
        group.querySelectorAll<HTMLButtonElement>(".acc-trigger")
      );
      triggers.forEach((btn) => {
        const panel = document.getElementById(btn.getAttribute("aria-controls") || "");
        if (!panel) return;
        if (btn.getAttribute("aria-expanded") === "true") openP(btn, panel);
        const onClick = () => {
          const isOpen = btn.getAttribute("aria-expanded") === "true";
          if (single) {
            triggers.forEach((other) => {
              if (other !== btn) {
                const op = document.getElementById(other.getAttribute("aria-controls") || "");
                if (op) closeP(other, op);
              }
            });
          }
          if (isOpen) closeP(btn, panel);
          else openP(btn, panel);
        };
        btn.addEventListener("click", onClick);
        cleanups.push(() => btn.removeEventListener("click", onClick));
      });
    });

    const onResize = () => {
      document
        .querySelectorAll<HTMLButtonElement>('.acc-trigger[aria-expanded="true"]')
        .forEach((btn) => {
          const p = document.getElementById(btn.getAttribute("aria-controls") || "");
          if (p) p.style.maxHeight = p.scrollHeight + "px";
        });
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    // ---- Navbar style-on-scroll ----
    const nav = document.getElementById("nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // ---- Reveal on scroll ----
    const reveals = document.querySelectorAll(".js-reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      reveals.forEach((el) => el.classList.add("in-view"));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
