"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${
        menuOpen ? "navbar--open" : ""
      }`}
    >
      <a
        href="#top"
        className="navbar__brand"
        aria-label="Virelis home"
        onClick={closeMenu}
      >
        VIRELIS
      </a>

      <div className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        <a
          href="#innovation"
          className="navbar__link"
          onClick={closeMenu}
        >
          Science
        </a>

        <a
          href="#research"
          className="navbar__link"
          onClick={closeMenu}
        >
          Approach
        </a>

        <a
          href="#capabilities"
          className="navbar__link"
          onClick={closeMenu}
        >
          Capabilities
        </a>

        <a
          href="#impact"
          className="navbar__link"
          onClick={closeMenu}
        >
          Impact
        </a>
      </div>

      <div className="navbar__actions">
        <a
          href="#contact"
          className="navbar__contact"
          onClick={closeMenu}
        >
          Contact us
        </a>

        <button
          type="button"
          className="navbar__menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}