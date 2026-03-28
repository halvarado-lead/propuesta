import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer__brand">
            <div className="footer__logo-row">
              <img
                src="https://web.archive.org/web/20250320151454im_/https://atmcentroguayas.gob.ec/images/stories/logo-smal-web01.png"
                alt="Logo ATM Centro Guayas"
                className="footer__logo"
                onError={(e) => { e.target.style.background = 'var(--azul-primario)'; e.target.style.borderRadius = '50%'; }}
              />
              <span className="footer__brand-name">ATM Centro Guayas - EP</span>
            </div>
            <p className="footer__brand-desc">Empresa Publica Autoridad de Transito Mancomunada Centro Guayas. Trabajamos mancomunadamente por tu seguridad.</p>
            <div className="footer__social">
              <a href="https://www.facebook.com/ATMancomunadaCGEP/" className="footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com/ATMCentroGuayas" className="footer__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="https://www.instagram.com/atmcentroguayasep/" className="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Institucion</div>
            <ul className="footer__links">
              <li><Link to="/institucion">Quienes somos</Link></li>
              <li><Link to="/institucion">El Directorio</Link></li>
              <li><Link to="/institucion">Mancomunidad MMC-G</Link></li>
              <li><Link to="/institucion">Marco legal</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Servicios</div>
            <ul className="footer__links">
              <li><Link to="/servicios">Matriculacion vehicular</Link></li>
              <li><Link to="/servicios">Revision tecnica</Link></li>
              <li><Link to="/servicios">Titulos habilitantes</Link></li>
              <li><Link to="/servicios">Consulta de multas</Link></li>
              <li><Link to="/servicios">Certificados RTV</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Acceso rapido</div>
            <ul className="footer__links">
              <li><Link to="/transparencia">Transparencia LOTAIP</Link></li>
              <li><Link to="/transparencia">Rendicion de cuentas</Link></li>
              <li><Link to="/noticias">Noticias</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/contacto">Preguntas frecuentes</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; 2025 ATM Centro Guayas - EP. Todos los derechos reservados.</span>
          <span>Nobol, Guayas - Ecuador</span>
        </div>
      </div>
    </footer>
  );
}
