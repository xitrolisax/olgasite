'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
    >
      <div className={styles.headerInner}>
        <a href="#top" className={styles.brand} data-attr="header-brand">
          <span className={styles.brandName}>OLGA FREDRICK</span>
          <span className={styles.brandDot}>•</span>
        </a>
        <nav className={styles.nav}>
          <a href="#services" data-attr="nav-services">SERVICES</a>
          <a href="#experience" data-attr="nav-experience">EXPERIENCE</a>
          <a href="#about" data-attr="nav-about">ABOUT</a>
          <a href="#contact" data-attr="nav-contact">CONTACT</a>
        </nav>
      </div>
    </header>
  );
}
