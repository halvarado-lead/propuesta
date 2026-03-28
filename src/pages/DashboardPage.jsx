import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tramites } from '../data/tramites';

export default function DashboardPage() {
  const { user, getUserTramites } = useAuth();
  const misTramites = getUserTramites();

  const onlineTramites = tramites.filter((t) => t.online);

  const stats = [
    { label: 'Tramites realizados', value: misTramites.length },
    { label: 'En revision', value: misTramites.filter((t) => t.estado === 'En revision').length },
    { label: 'Completados', value: misTramites.filter((t) => t.estado === 'Completado').length },
    { label: 'Rechazados', value: misTramites.filter((t) => t.estado === 'Rechazado').length },
  ];

  const getEstadoClass = (estado) => {
    const map = { 'En revision': 'revision', 'En proceso': 'proceso', 'Completado': 'completado', 'Rechazado': 'rechazado' };
    return map[estado] || 'revision';
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Bienvenido, {user?.nombres}</h1>
            <p>Panel de control de tramites vehiculares</p>
          </div>
        </div>

        <div className="dashboard-stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card mb-3">
          <h2>Iniciar nuevo tramite</h2>
          <p className="text-muted mb-2">Seleccione el tramite que desea realizar en linea</p>
          <div className="servicios-grid">
            {onlineTramites.map((t) => (
              <div key={t.id} className="servicio-card">
                <h3>{t.nombre}</h3>
                <p>{t.descripcion}</p>
                <Link to={`/tramite/${t.slug}`} className="btn btn-primary btn-sm">
                  Iniciar tramite
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Mis tramites</h2>
          {misTramites.length === 0 ? (
            <p className="text-muted text-center" style={{ padding: '32px 0' }}>
              No tiene tramites registrados. Inicie un nuevo tramite para comenzar.
            </p>
          ) : (
            <table className="tramites-table">
              <thead>
                <tr>
                  <th>N. Tramite</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {misTramites.map((t) => (
                  <tr key={t.id}>
                    <td>ATM-{String(t.id).slice(-6)}</td>
                    <td>{t.nombreTramite}</td>
                    <td>{new Date(t.fecha).toLocaleDateString('es-EC')}</td>
                    <td>
                      <span className={`estado-badge ${getEstadoClass(t.estado)}`}>{t.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
