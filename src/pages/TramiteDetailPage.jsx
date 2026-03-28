import { useParams, Link } from 'react-router-dom';
import { tramites } from '../data/tramites';

export default function TramiteDetailPage() {
  const { slug } = useParams();
  const tramite = tramites.find((t) => t.slug === slug);

  if (!tramite) {
    return (
      <div className="page-content">
        <div className="container text-center">
          <h1>Tramite no encontrado</h1>
          <p>El tramite solicitado no existe.</p>
          <Link to="/servicios" className="btn btn-primary">Ver todos los servicios</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tramite-detail">
      <div className="tramite-hero">
        <div className="container">
          <h1>{tramite.nombre}</h1>
          <p>{tramite.descripcion}</p>
          <div className="tramite-meta">
            <div className="tramite-meta-item">
              <strong>Costo:</strong> <span>{tramite.costoAproximado}</span>
            </div>
            <div className="tramite-meta-item">
              <strong>Tiempo:</strong> <span>{tramite.tiempoEstimado}</span>
            </div>
            <div className="tramite-meta-item">
              <strong>Modalidad:</strong> <span className={tramite.online ? 'text-success' : 'text-warning'}>{tramite.online ? 'Disponible en linea' : 'Presencial'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tramite-info-grid">
          <div className="tramite-info-card">
            <h2>Requisitos</h2>
            <ul className="requisitos-list">
              {tramite.requisitos.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="tramite-info-card">
            <h2>Informacion del tramite</h2>
            <p><strong>Categoria:</strong> {tramite.categoria.charAt(0).toUpperCase() + tramite.categoria.slice(1)}</p>
            <p><strong>Costo aproximado:</strong> {tramite.costoAproximado}</p>
            <p><strong>Tiempo estimado:</strong> {tramite.tiempoEstimado}</p>
            {tramite.online ? (
              <>
                <p className="text-success mt-2" style={{ fontWeight: 600 }}>
                  Este tramite esta disponible para realizarse en linea.
                </p>
                <Link to={`/tramite/${tramite.slug}`} className="btn btn-primary mt-2">
                  Realizar tramite en linea
                </Link>
              </>
            ) : (
              <p className="text-warning mt-2" style={{ fontWeight: 600 }}>
                Este tramite requiere atencion presencial. Acerquese a cualquiera de nuestras oficinas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
