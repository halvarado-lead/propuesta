import { useState } from 'react';

// Simula busqueda de tramites en todos los usuarios del localStorage
function buscarTramite(numero) {
  if (!numero || numero.length < 3) {
    return { success: false, error: 'Ingrese un numero de tramite valido (ej: ATM-123456).' };
  }

  // Extraer el ID numerico del formato ATM-XXXXXX
  const idBuscado = numero.replace(/[^0-9]/g, '');
  if (!idBuscado) {
    return { success: false, error: 'Ingrese un numero de tramite valido.' };
  }

  // Buscar en todos los usuarios almacenados
  try {
    const users = JSON.parse(localStorage.getItem('atm_users') || '[]');
    for (const user of users) {
      const tramites = JSON.parse(localStorage.getItem(`atm_tramites_${user.cedula}`) || '[]');
      const found = tramites.find(t => String(t.id).endsWith(idBuscado) || String(t.id) === idBuscado);
      if (found) {
        return {
          success: true,
          tramite: {
            ...found,
            numeroFormateado: `ATM-${String(found.id).slice(-6)}`,
            propietario: user.nombres,
            cedula: user.cedula.slice(0, 4) + '****' + user.cedula.slice(-2),
          }
        };
      }
    }
  } catch (e) {
    // ignore parse errors
  }

  // Si no encuentra en localStorage, generar datos simulados para demo
  const seed = parseInt(idBuscado.slice(-4) || '1234', 10);
  const estados = ['En revision', 'En proceso', 'Completado', 'Rechazado'];
  const tipos = ['Matriculacion Primera Vez', 'Renovacion Anual', 'Duplicado de Placas', 'Transferencia de Dominio'];
  const estadoIdx = seed % 4;
  const tipoIdx = (seed + 1) % 4;

  const fechaBase = new Date(2025, (seed % 12), (seed % 28) + 1);
  const historial = [
    { fecha: fechaBase.toISOString(), estado: 'Recibido', detalle: 'Solicitud recibida en el sistema' },
    { fecha: new Date(fechaBase.getTime() + 86400000).toISOString(), estado: 'En revision', detalle: 'Documentacion en proceso de verificacion' },
  ];

  if (estadoIdx >= 1) {
    historial.push({
      fecha: new Date(fechaBase.getTime() + 86400000 * 3).toISOString(),
      estado: 'En proceso',
      detalle: 'Tramite aprobado, en espera de emision de documentos'
    });
  }
  if (estadoIdx === 2) {
    historial.push({
      fecha: new Date(fechaBase.getTime() + 86400000 * 7).toISOString(),
      estado: 'Completado',
      detalle: 'Tramite finalizado. Puede retirar sus documentos en la oficina de Nobol.'
    });
  }
  if (estadoIdx === 3) {
    historial.push({
      fecha: new Date(fechaBase.getTime() + 86400000 * 2).toISOString(),
      estado: 'Rechazado',
      detalle: 'Documentacion incompleta. Falta certificado de votacion vigente.'
    });
  }

  return {
    success: true,
    tramite: {
      id: idBuscado,
      numeroFormateado: `ATM-${idBuscado.slice(-6).padStart(6, '0')}`,
      nombreTramite: tipos[tipoIdx],
      estado: estados[estadoIdx],
      fecha: fechaBase.toISOString(),
      propietario: 'Usuario de prueba',
      cedula: '09XX****XX',
      historial,
    }
  };
}

function getEstadoColor(estado) {
  switch (estado) {
    case 'Completado': return '#27ae60';
    case 'Rechazado': return '#e74c3c';
    case 'En proceso': return '#f39c12';
    case 'En revision': return '#3498db';
    case 'Recibido': return '#95a5a6';
    default: return '#95a5a6';
  }
}

function getEstadoIcon(estado) {
  const props = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', width: '20', height: '20' };
  switch (estado) {
    case 'Completado':
      return <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
    case 'Rechazado':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
    case 'En proceso':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case 'En revision':
      return <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  }
}

export default function SeguimientoPage() {
  const [numero, setNumero] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);
    setBuscando(true);

    setTimeout(() => {
      const res = buscarTramite(numero);
      if (!res.success) {
        setError(res.error);
      } else {
        setResultado(res.tramite);
      }
      setBuscando(false);
    }, 1000);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Seguimiento de Tramites</h1>
          <p>Consulte el estado de su tramite con el numero de referencia</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Formulario de busqueda */}
          <div className="seguimiento-card">
            <div className="seguimiento-header">
              <div className="seguimiento-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h2>Consultar estado del tramite</h2>
                <p>Ingrese el numero de tramite que recibio al realizar su solicitud</p>
              </div>
            </div>

            <form onSubmit={handleBuscar} className="seguimiento-form">
              <div className="seguimiento-form-row">
                <div className="form-group">
                  <label htmlFor="numero-tramite">Numero de tramite</label>
                  <input
                    id="numero-tramite"
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value.toUpperCase())}
                    placeholder="Ej: ATM-123456"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary seguimiento-btn" disabled={buscando}>
                  {buscando ? (
                    <>
                      <span className="spinner-small"></span>
                      Buscando...
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

            {error && <div className="alert alert-danger">{error}</div>}
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="seguimiento-resultado">
              {/* Estado principal */}
              <div className="seguimiento-estado-card" style={{ borderLeftColor: getEstadoColor(resultado.estado) }}>
                <div className="seguimiento-estado-top">
                  <div>
                    <div className="seguimiento-numero">{resultado.numeroFormateado}</div>
                    <div className="seguimiento-tipo">{resultado.nombreTramite}</div>
                  </div>
                  <div className="seguimiento-badge" style={{ background: getEstadoColor(resultado.estado) }}>
                    {getEstadoIcon(resultado.estado)}
                    {resultado.estado}
                  </div>
                </div>

                <div className="seguimiento-datos-grid">
                  <div className="seguimiento-dato">
                    <span>Solicitante</span>
                    <strong>{resultado.propietario}</strong>
                  </div>
                  <div className="seguimiento-dato">
                    <span>Cedula</span>
                    <strong>{resultado.cedula}</strong>
                  </div>
                  <div className="seguimiento-dato">
                    <span>Fecha de solicitud</span>
                    <strong>{new Date(resultado.fecha).toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </div>
                  <div className="seguimiento-dato">
                    <span>Estado actual</span>
                    <strong style={{ color: getEstadoColor(resultado.estado) }}>{resultado.estado}</strong>
                  </div>
                </div>
              </div>

              {/* Timeline / Historial */}
              {resultado.historial && resultado.historial.length > 0 && (
                <div className="seguimiento-historial-card">
                  <h3>Historial del tramite</h3>
                  <div className="seguimiento-timeline">
                    {resultado.historial.map((h, i) => (
                      <div key={i} className={`timeline-item${i === resultado.historial.length - 1 ? ' timeline-item--last' : ''}`}>
                        <div className="timeline-dot" style={{ background: getEstadoColor(h.estado) }}></div>
                        <div className="timeline-content">
                          <div className="timeline-fecha">
                            {new Date(h.fecha).toLocaleDateString('es-EC', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="timeline-estado">{h.estado}</div>
                          <div className="timeline-detalle">{h.detalle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="seguimiento-acciones">
                {resultado.estado === 'Rechazado' && (
                  <div className="seguimiento-aviso seguimiento-aviso--danger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <div>
                      <strong>Tramite rechazado</strong>
                      <p>Por favor revise las observaciones y acerquese a nuestras oficinas para regularizar su solicitud.</p>
                    </div>
                  </div>
                )}
                {resultado.estado === 'Completado' && (
                  <div className="seguimiento-aviso seguimiento-aviso--success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <div>
                      <strong>Tramite completado</strong>
                      <p>Su tramite ha sido procesado exitosamente. Puede retirar sus documentos en la oficina correspondiente.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
