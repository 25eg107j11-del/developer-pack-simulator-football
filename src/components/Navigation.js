'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/packs', label: 'Packs', icon: '📦' },
    { href: '/collection', label: 'Collection', icon: '🃏' },
    { href: '/lineup', label: 'Lineup', icon: '📋' },
    { href: '/achievements', label: 'Achievements', icon: '🏆' },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-icon">⚽</span>
          <span className="gradient-text">DevPack</span>
        </Link>

        <ul className="nav-links">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="btn btn-outline"
          style={{
            display: 'none',
            padding: '0.4rem 0.8rem',
            fontSize: '1.2rem',
          }}
          id="mobile-menu-btn"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
