import { Link } from 'react-router-dom';
import { noticias } from '../data/noticias';

export default function NoticiasPage() {
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Noticias</h1>
          <p>Mantente informado sobre las actividades de ATM Centro Guayas</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="noticias-grid">
            {noticias.map((n) => (
              <Link to={`/noticias/${n.slug}`} key={n.id} className="noticia-card" style={{ textDecoration: 'none' }}>
                <div className="noticia-card__img">
                  {n.imagen ? (
                    <img src={n.imagen} alt={n.titulo} loading="lazy" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--gris-200)' }} />
                  )}
                </div>
                <div className="noticia-card__body">
                  <p className="noticia-card__date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {n.fechaTexto || formatFecha(n.fecha)}
                  </p>
                  <span className="noticia-card__categoria">{n.categoria}</span>
                  <h3 className="noticia-card__title">{n.titulo}</h3>
                  <p className="noticia-card__excerpt">{n.resumen}</p>
                  <span className="noticia-card__leer">
                    Leer mas
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
