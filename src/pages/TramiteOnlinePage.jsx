import { useParams, Link } from 'react-router-dom';
import { tramites } from '../data/tramites';
import TramiteWizard from '../components/tramites/TramiteWizard';

export default function TramiteOnlinePage() {
  const { slug } = useParams();
  const tramite = tramites.find((t) => t.slug === slug);

  if (!tramite || !tramite.online) {
    return (
      <div className="page-content">
        <div className="container text-center">
          <h1>Tramite no disponible</h1>
          <p>Este tramite no esta disponible para realizarse en linea.</p>
          <Link to="/servicios" className="btn btn-primary">Ver todos los servicios</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>{tramite.nombre}</h1>
          <p>Complete los siguientes pasos para realizar su tramite en linea</p>
        </div>
      </div>
      <TramiteWizard tramite={tramite} />
    </>
  );
}
