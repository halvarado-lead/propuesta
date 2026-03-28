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
              <div key={n.id} className="noticia-card">
                <div className="noticia-card-img"></div>
                <div className="noticia-card-body">
                  <p className="noticia-card-fecha">{formatFecha(n.fecha)} | {n.categoria}</p>
                  <h3>{n.titulo}</h3>
                  <p>{n.resumen}</p>
                  <p className="noticia-card-contenido">{n.contenido}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
