'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/packs', label: 'Packs' },
    { href: '/collection', label: 'Collection' },
    { href: '/lineup', label: 'Lineup' },
    { href: '/achievements', label: 'Achievements' },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="gradient-text">DevPack</span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginLeft: '0.25rem',
            alignSelf: 'flex-end',
            marginBottom: '2px',
          }}>FC</span>
        </Link>

        <ul className="nav-links">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
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
