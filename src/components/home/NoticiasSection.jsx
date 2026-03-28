import { Link } from 'react-router-dom';
import { noticias } from '../../data/noticias';

const calendarSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

const arrowSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default function NoticiasSection() {
  const recientes = noticias.slice(0, 3);

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <section className="section" aria-labelledby="noticias-titulo">
      <div className="container">
        <div className="section__header">
          <div className="section__overline">Comunicacion</div>
          <h2 className="section__title" id="noticias-titulo">Noticias y Comunicados</h2>
        </div>

        <div className="noticias-grid">
          {recientes.map((n) => (
            <article key={n.id} className="noticia-card">
              <div className="noticia-card__img">
                {n.imagen ? (
                  <img
                    src={n.imagen}
                    alt={n.titulo}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--gris-200)' }} />
                )}
              </div>
              <div className="noticia-card__body">
                <div className="noticia-card__date">
                  {calendarSvg}
                  {n.fechaTexto || formatFecha(n.fecha)}
                </div>
                <h3 className="noticia-card__title">{n.titulo}</h3>
                <p className="noticia-card__excerpt">{n.resumen}</p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/noticias" className="btn btn--blue">
            Ver todas las noticias
            {arrowSvg}
          </Link>
        </div>
      </div>
    </section>
  );
}
