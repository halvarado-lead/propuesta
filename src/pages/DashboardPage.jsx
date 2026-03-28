import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tramites } from '../data/tramites';
import AgendarCita from '../components/tramites/AgendarCita';
import Modal from '../components/ui/Modal';

export default function DashboardPage() {
  const { user, getUserTramites, saveTramite } = useAuth();
  const misTramites = getUserTramites();
  const [reagendarTramite, setReagendarTramite] = useState(null);

  const onlineTramites = tramites.filter((t) => t.online);

  const citasPendientes = misTramites.filter(t => t.cita && t.estado !== 'Completado' && t.estado !== 'Rechazado');

  const stats = [
    { label: 'Tramites realizados', value: misTramites.length },
    { label: 'En revision', value: misTramites.filter((t) => t.estado === 'En revision').length },
    { label: 'Completados', value: misTramites.filter((t) => t.estado === 'Completado').length },
    { label: 'Citas pendientes', value: citasPendientes.length },
  ];

  const getEstadoClass = (estado) => {
    const map = { 'En revision': 'revision', 'En proceso': 'proceso', 'Completado': 'completado', 'Rechazado': 'rechazado' };
    return map[estado] || 'revision';
  };

  const puedeReagendar = (cita) => {
    if (!cita?.fecha || !cita?.hora) return false;
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}:00`);
    const ahora = new Date();
    const diff = fechaCita.getTime() - ahora.getTime();
    return diff > 24 * 60 * 60 * 1000; // mas de 24h
  };

  const handleReagendar = (nuevaCita) => {
    if (!reagendarTramite) return;
    // Update in localStorage
    const stored = JSON.parse(localStorage.getItem(`atm_tramites_${user.cedula}`) || '[]');
    const idx = stored.findIndex(t => t.id === reagendarTramite.id);
    if (idx !== -1) {
      stored[idx].cita = nuevaCita;
      localStorage.setItem(`atm_tramites_${user.cedula}`, JSON.stringify(stored));
    }
    setReagendarTramite(null);
    // Force re-render
    window.location.reload();
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

        {/* Citas pendientes */}
        {citasPendientes.length > 0 && (
          <div className="card mb-3">
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--azul-primario)" strokeWidth="2" width="22" height="22" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Citas programadas
            </h2>
            <div className="citas-grid">
              {citasPendientes.map(t => (
                <div key={t.id} className="cita-card">
                  <div className="cita-card__info">
                    <h4>{t.nombreTramite}</h4>
                    <div className="cita-card__detalle">
                      <div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>{t.cita.fechaTexto}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{t.cita.hora}</span>
                      </div>
                      <div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{t.cita.oficinaNombre}</span>
                      </div>
                    </div>
                  </div>
                  <div className="cita-card__actions">
                    <span className={`estado-badge ${getEstadoClass(t.estado)}`}>{t.estado}</span>
                    {puedeReagendar(t.cita) ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setReagendarTramite(t)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                        </svg>
                        Reagendar
                      </button>
                    ) : (
                      <span className="cita-card__no-reagendar">
                        No se puede reagendar (menos de 24h)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  <th>Cita</th>
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
                      {t.cita ? (
                        <span className="cita-badge">
                          {new Date(t.cita.fecha + 'T12:00:00').toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })} {t.cita.hora}
                        </span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
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

      {/* Modal de reagendamiento */}
      {reagendarTramite && (
        <Modal onClose={() => setReagendarTramite(null)}>
          <div style={{ padding: '24px', maxWidth: 600, width: '100%' }}>
            <h2 style={{ marginBottom: 4, color: 'var(--azul-primario)' }}>
              Reagendar cita
            </h2>
            <p className="text-muted" style={{ marginBottom: 20 }}>
              Tramite: {reagendarTramite.nombreTramite} (ATM-{String(reagendarTramite.id).slice(-6)})
            </p>
            <AgendarCita
              onAgendar={handleReagendar}
              citaActual={reagendarTramite.cita}
              modoReagendar={true}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
