import { useParams, Link } from 'react-router-dom';
import { noticias } from '../data/noticias';

export default function NoticiaDetailPage() {
  const { slug } = useParams();
  const noticia = noticias.find(n => n.slug === slug);

  if (!noticia) {
    return (
      <div className="page-content">
        <div className="container text-center" style={{ padding: '80px 0' }}>
          <h1>Noticia no encontrada</h1>
          <p className="text-muted">La noticia que busca no existe o ha sido eliminada.</p>
          <Link to="/noticias" className="btn btn-primary" style={{ marginTop: 16 }}>Ver todas las noticias</Link>
        </div>
      </div>
    );
  }

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-EC', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  // Get related noticias (same category, excluding current)
  const relacionadas = noticias
    .filter(n => n.id !== noticia.id)
    .slice(0, 3);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link to="/noticias" className="noticia-detail-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver a noticias
          </Link>
          <h1>{noticia.titulo}</h1>
          <div className="noticia-detail-meta">
            <span className="noticia-detail-fecha">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {noticia.fechaTexto || formatFecha(noticia.fecha)}
            </span>
            <span className="noticia-detail-cat">{noticia.categoria}</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="noticia-detail-layout">
            <article className="noticia-detail-main">
              {noticia.imagen && (
                <div className="noticia-detail-imagen">
                  <img src={noticia.imagen} alt={noticia.titulo} />
                </div>
              )}

              <div className="noticia-detail-contenido">
                {noticia.contenido.split('\n\n').map((parrafo, i) => {
                  // Check if paragraph contains list items (lines starting with -)
                  if (parrafo.includes('\n-')) {
                    const lines = parrafo.split('\n');
                    const intro = lines[0];
                    const items = lines.slice(1).filter(l => l.startsWith('-'));
                    return (
                      <div key={i}>
                        {intro && <p>{intro}</p>}
                        <ul>
                          {items.map((item, j) => (
                            <li key={j}>{item.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return <p key={i}>{parrafo}</p>;
                })}
              </div>

              <div className="noticia-detail-compartir">
                <span>Compartir:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="noticia-share-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(noticia.titulo)}`} target="_blank" rel="noopener noreferrer" className="noticia-share-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
              </div>
            </article>

            <aside className="noticia-detail-sidebar">
              <h3>Otras noticias</h3>
              {relacionadas.map(n => (
                <Link to={`/noticias/${n.slug}`} key={n.id} className="noticia-sidebar-item">
                  {n.imagen && (
                    <div className="noticia-sidebar-img">
                      <img src={n.imagen} alt={n.titulo} loading="lazy" />
                    </div>
                  )}
                  <div>
                    <span className="noticia-sidebar-fecha">{n.fechaTexto || formatFecha(n.fecha)}</span>
                    <h4>{n.titulo}</h4>
                  </div>
                </Link>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
