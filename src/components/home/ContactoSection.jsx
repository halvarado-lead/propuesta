import { contacto } from '../../data/oficinas';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/ATM+Centro+Guayas/@-1.9122,-80.0028,15z';
const EMBED_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d-80.0028!3d-1.9122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTQnNDQuMCJTIDgwwrAwMCcxMC4xIlc!5e0!3m2!1ses!2sec!4v1700000000000';

export default function ContactoSection() {
  return (
    <section className="section" aria-labelledby="contacto-titulo">
      <div className="container">
        <div className="section__header">
          <div className="section__overline">Atencion ciudadana</div>
          <h2 className="section__title" id="contacto-titulo">Canales de Contacto</h2>
        </div>

        <div className="contacto-banner">
          <div className="contacto-grid">
            <div className="contacto-item">
              <div className="contacto-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div className="contacto-item__label">Telefono</div>
                <div className="contacto-item__value">{contacto.telefono}</div>
              </div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div className="contacto-item__label">Correo electronico</div>
                <div className="contacto-item__value">{contacto.email}</div>
              </div>
            </div>
            <div className="contacto-item">
              <div className="contacto-item__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div className="contacto-item__label">Direccion</div>
                <div className="contacto-item__value">{contacto.direccion}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contacto-map-wrapper">
          <iframe
            className="contacto-map"
            src={EMBED_MAP_URL}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicacion ATM Centro Guayas - Nobol"
          ></iframe>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary contacto-map-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Como llegar
          </a>
        </div>
      </div>
    </section>
  );
}
