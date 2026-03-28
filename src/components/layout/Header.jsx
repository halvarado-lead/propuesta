import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/institucion', label: 'Institucion' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/servicios', label: 'Tramites' },
    { to: '/noticias', label: 'Noticias' },
    { to: '/transparencia', label: 'Transparencia' },
    { to: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <div className="barra-gobierno" role="banner">
        <div className="container">
          <div className="barra-gobierno__left">
            <div className="barra-gobierno__escudo">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 7h2v6h-2V9zm0-4h2v2h-2V5z"/></svg>
            </div>
            <span className="barra-gobierno__text">Sitio oficial de la Republica del Ecuador</span>
          </div>
          <a href="https://www.gob.ec" className="barra-gobierno__link" target="_blank" rel="noopener noreferrer">
            gob.ec &rarr;
          </a>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <Link to="/" className="header__brand" aria-label="Inicio - ATM Centro Guayas EP">
            <img
              className="header__logo"
              src="https://web.archive.org/web/20250320151454im_/https://atmcentroguayas.gob.ec/images/stories/logo-smal-web01.png"
              alt="ATM Centro Guayas"
              style={{ border: '2px solid var(--azul-border)' }}
              onError={(e) => { e.target.style.background = 'var(--azul-primario)'; }}
            />
            <div className="header__info">
              <span className="header__name">ATM Centro Guayas</span>
              <span className="header__subtitle">Empresa Publica</span>
            </div>
          </Link>

          <nav className={`nav-main${menuOpen ? ' nav-main--open' : ''}`} aria-label="Menu principal">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-main__link${isActive ? ' nav-main__link--active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {isAuthenticated ? (
            <div className="user-dropdown">
              <button
                className="header__search-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Mi cuenta
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="header__search-btn" aria-label="Buscar en el sitio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Buscar
              </button>
              <Link to="/login" className="nav-main__link" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Iniciar sesion
              </Link>
            </>
          )}

          <button
            className="header__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
}
