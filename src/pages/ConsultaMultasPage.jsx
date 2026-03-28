import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { consultarMultas, puntosPago } from '../data/multas';
import PagoOnlineModal from '../components/ui/PagoOnlineModal';

export default function ConsultaMultasPage() {
  const { user } = useAuth();
  const [cedula, setCedula] = useState(user?.cedula || '');
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [consultando, setConsultando] = useState(false);
  const [tabActiva, setTabActiva] = useState('todas');
  const [pagoModal, setPagoModal] = useState({ open: false, multa: null });

  const handleConsultar = (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);

    if (!cedula || cedula.length < 10) {
      setError('Ingrese una cedula valida de 10 digitos.');
      return;
    }

    setConsultando(true);
    setTimeout(() => {
      const res = consultarMultas(cedula);
      if (!res.success) {
        setError(res.error);
      } else {
        setResultado(res);
      }
      setConsultando(false);
    }, 1200);
  };

  const handlePagarMulta = (multa) => {
    setPagoModal({ open: true, multa });
  };

  const handlePagarTodas = () => {
    const pendientes = resultado.multas.filter(m => m.estado === 'Pendiente');
    setPagoModal({
      open: true,
      multa: {
        id: 'TODAS',
        tipo: `Pago de ${pendientes.length} multa(s) pendiente(s)`,
        monto: resultado.resumen.monto,
      }
    });
  };

  const handlePagoExitoso = () => {
    if (pagoModal.multa) {
      setResultado(prev => {
        if (!prev) return prev;
        const updatedMultas = prev.multas.map(m => {
          if (pagoModal.multa.id === 'TODAS' && m.estado === 'Pendiente') {
            return { ...m, estado: 'Pagada' };
          }
          if (m.id === pagoModal.multa.id) {
            return { ...m, estado: 'Pagada' };
          }
          return m;
        });
        const pendientes = updatedMultas.filter(m => m.estado === 'Pendiente');
        return {
          ...prev,
          multas: updatedMultas,
          resumen: {
            ...prev.resumen,
            pendientes: pendientes.length,
            pagadas: updatedMultas.length - pendientes.length,
            puntos: pendientes.reduce((acc, m) => acc + m.puntos, 0),
            monto: pendientes.reduce((acc, m) => acc + m.monto, 0),
          }
        };
      });
    }
  };

  const multasFiltradas = resultado?.multas?.filter(m => {
    if (tabActiva === 'pendientes') return m.estado === 'Pendiente';
    if (tabActiva === 'pagadas') return m.estado === 'Pagada';
    return true;
  }) || [];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Consulta de Multas Vehiculares</h1>
          <p>Verifique si tiene infracciones de transito pendientes</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="multas-consulta-card">
            <div className="multas-consulta-header">
              <div className="multas-consulta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <div>
                <h2>Consultar infracciones</h2>
                <p>Ingrese su cedula de identidad para consultar multas registradas</p>
              </div>
            </div>

            <form onSubmit={handleConsultar} className="multas-form">
              <div className="multas-form-row">
                <div className="form-group">
                  <label htmlFor="cedula">Cedula de identidad</label>
                  <input
                    id="cedula"
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Ej: 0901234567"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="placa">Placa (opcional)</label>
                  <input
                    id="placa"
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value.toUpperCase().slice(0, 8))}
                    placeholder="Ej: GBA-1234"
                    maxLength={8}
                  />
                </div>
                <button type="submit" className="btn btn-primary multas-btn-consultar" disabled={consultando}>
                  {consultando ? (
                    <>
                      <span className="spinner-small"></span>
                      Consultando...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      Consultar
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
          </div>

          {resultado && (
            <>
              <div className="multas-resumen">
                <div className="multas-resumen-card multas-resumen-card--total">
                  <div className="multas-resumen-numero">{resultado.resumen.total}</div>
                  <div className="multas-resumen-label">Total citaciones</div>
                </div>
                <div className="multas-resumen-card multas-resumen-card--pendiente">
                  <div className="multas-resumen-numero">{resultado.resumen.pendientes}</div>
                  <div className="multas-resumen-label">Pendientes</div>
                </div>
                <div className="multas-resumen-card multas-resumen-card--pagada">
                  <div className="multas-resumen-numero">{resultado.resumen.pagadas}</div>
                  <div className="multas-resumen-label">Pagadas</div>
                </div>
                <div className="multas-resumen-card multas-resumen-card--puntos">
                  <div className="multas-resumen-numero">{resultado.resumen.puntos}</div>
                  <div className="multas-resumen-label">Puntos acumulados</div>
                </div>
                <div className="multas-resumen-card multas-resumen-card--monto">
                  <div className="multas-resumen-numero">${resultado.resumen.monto.toFixed(2)}</div>
                  <div className="multas-resumen-label">Monto adeudado</div>
                </div>
              </div>

              {/* Boton pagar todas */}
              {resultado.resumen.pendientes > 0 && (
                <div className="multas-pagar-todas">
                  <div className="multas-pagar-todas-info">
                    <span>Total pendiente de pago:</span>
                    <strong>${resultado.resumen.monto.toFixed(2)}</strong>
                  </div>
                  <button className="btn btn-primary" onClick={handlePagarTodas}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Pagar todas las multas
                  </button>
                </div>
              )}

              {resultado.multas.length > 0 ? (
                <div className="multas-tabla-card">
                  <div className="multas-tabla-header">
                    <h3>Detalle de citaciones</h3>
                    <div className="multas-tabs">
                      <button
                        className={`multas-tab${tabActiva === 'todas' ? ' multas-tab--active' : ''}`}
                        onClick={() => setTabActiva('todas')}
                      >
                        Todas ({resultado.multas.length})
                      </button>
                      <button
                        className={`multas-tab${tabActiva === 'pendientes' ? ' multas-tab--active' : ''}`}
                        onClick={() => setTabActiva('pendientes')}
                      >
                        Pendientes ({resultado.resumen.pendientes})
                      </button>
                      <button
                        className={`multas-tab${tabActiva === 'pagadas' ? ' multas-tab--active' : ''}`}
                        onClick={() => setTabActiva('pagadas')}
                      >
                        Pagadas ({resultado.resumen.pagadas})
                      </button>
                    </div>
                  </div>

                  <div className="multas-tabla-responsive">
                    <table className="multas-tabla">
                      <thead>
                        <tr>
                          <th>N. Citacion</th>
                          <th>Fecha</th>
                          <th>Infraccion</th>
                          <th>Placa</th>
                          <th>Puntos</th>
                          <th>Monto</th>
                          <th>Estado</th>
                          <th>Accion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {multasFiltradas.map((m) => (
                          <tr key={m.id}>
                            <td className="multas-tabla-id">{m.id}</td>
                            <td>{m.fecha}</td>
                            <td><strong>{m.tipo}</strong></td>
                            <td><span className="multas-placa">{m.placa}</span></td>
                            <td className="text-center">{m.puntos}</td>
                            <td className="multas-tabla-monto">${m.monto.toFixed(2)}</td>
                            <td>
                              <span className={`multas-estado multas-estado--${m.estado.toLowerCase()}`}>
                                {m.estado}
                              </span>
                            </td>
                            <td>
                              {m.estado === 'Pendiente' ? (
                                <button className="btn btn-primary btn-sm" onClick={() => handlePagarMulta(m)}>
                                  Pagar
                                </button>
                              ) : (
                                <span className="text-muted" style={{ fontSize: '0.8rem' }}>--</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {multasFiltradas.length === 0 && (
                    <p className="text-center text-muted" style={{ padding: '24px 0' }}>
                      No hay citaciones en esta categoria.
                    </p>
                  )}
                </div>
              ) : (
                <div className="multas-sin-resultados">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="56" height="56">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3>Sin infracciones registradas</h3>
                  <p>No se encontraron multas asociadas a la cedula <strong>{cedula}</strong>.</p>
                  <p>Su historial se encuentra limpio.</p>
                </div>
              )}

              {resultado.resumen.pendientes > 0 && (
                <div className="multas-pago-card">
                  <h3>Puntos de pago autorizados</h3>
                  <p className="text-muted">Tambien puede realizar el pago de sus multas en los siguientes puntos presenciales:</p>
                  <div className="multas-pago-grid">
                    {puntosPago.map((p, i) => (
                      <div key={i} className="multas-pago-item">
                        <div className="multas-pago-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                          </svg>
                        </div>
                        <div>
                          <div className="multas-pago-nombre">{p.nombre}</div>
                          <div className="multas-pago-tipo">{p.tipo}</div>
                          <div className="multas-pago-dir">{p.direccion}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <PagoOnlineModal
        isOpen={pagoModal.open}
        onClose={() => setPagoModal({ open: false, multa: null })}
        concepto={pagoModal.multa?.tipo || ''}
        monto={pagoModal.multa?.monto || 0}
        referencia={pagoModal.multa?.id || ''}
        onPagoExitoso={handlePagoExitoso}
      />
    </>
  );
}
