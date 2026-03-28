import { useState } from 'react';

const METODOS_PAGO = [
  { id: 'tarjeta', label: 'Tarjeta de credito/debito', icon: 'card' },
  { id: 'transferencia', label: 'Transferencia bancaria', icon: 'bank' },
  { id: 'deposito', label: 'Deposito bancario', icon: 'deposit' },
];

const BANCOS = [
  'Banco del Pacifico',
  'Banco de Guayaquil',
  'Produbanco',
  'Banco Pichincha',
  'Banco Bolivariano',
];

function getMetodoIcon(icon) {
  const props = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', width: '22', height: '22' };
  switch (icon) {
    case 'card':
      return <svg {...props}><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
    case 'bank':
      return <svg {...props}><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" /></svg>;
    case 'deposit':
      return <svg {...props}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M12 12v3M9 15h6" /><circle cx="12" cy="9" r="1" /></svg>;
    default:
      return null;
  }
}

export default function PagoOnlineModal({ isOpen, onClose, concepto, monto, referencia, onPagoExitoso }) {
  const [paso, setPaso] = useState(1); // 1: metodo, 2: datos, 3: confirmacion, 4: exito
  const [metodo, setMetodo] = useState('');
  const [formData, setFormData] = useState({});
  const [procesando, setProcesando] = useState(false);

  if (!isOpen) return null;

  const updateField = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const handleProcesar = () => {
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      setPaso(4);
      if (onPagoExitoso) {
        onPagoExitoso({
          metodo,
          monto,
          referencia,
          comprobante: `PAG-${Date.now().toString().slice(-8)}`,
          fecha: new Date().toISOString(),
        });
      }
    }, 2500);
  };

  const handleClose = () => {
    setPaso(1);
    setMetodo('');
    setFormData({});
    setProcesando(false);
    onClose();
  };

  const canProceed = () => {
    if (paso === 1) return !!metodo;
    if (paso === 2) {
      if (metodo === 'tarjeta') {
        return formData.numeroTarjeta && formData.nombreTitular && formData.expiracion && formData.cvv;
      }
      if (metodo === 'transferencia') {
        return formData.bancoOrigen && formData.numeroCuenta;
      }
      if (metodo === 'deposito') {
        return formData.bancoDeposito && formData.numeroDeposito;
      }
    }
    return true;
  };

  return (
    <div className="pago-overlay" onClick={handleClose}>
      <div className="pago-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="pago-modal-header">
          <div className="pago-modal-header-left">
            <div className="pago-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div>
              <h2>Pago en linea</h2>
              <p className="pago-modal-subtitle">Pago seguro - ATM Centro Guayas</p>
            </div>
          </div>
          <button className="pago-modal-close" onClick={handleClose}>&times;</button>
        </div>

        {/* Progress */}
        {paso < 4 && (
          <div className="pago-progress">
            {['Metodo', 'Datos', 'Confirmar'].map((label, i) => (
              <div key={i} className={`pago-progress-step${i + 1 <= paso ? ' pago-progress-step--active' : ''}${i + 1 < paso ? ' pago-progress-step--done' : ''}`}>
                <div className="pago-progress-circle">{i + 1 < paso ? '\u2713' : i + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Resumen de pago */}
        <div className="pago-resumen-bar">
          <span>{concepto}</span>
          <strong>${typeof monto === 'number' ? monto.toFixed(2) : monto}</strong>
        </div>

        {/* Paso 1: Metodo de pago */}
        {paso === 1 && (
          <div className="pago-body">
            <h3>Seleccione el metodo de pago</h3>
            <div className="pago-metodos">
              {METODOS_PAGO.map(m => (
                <button
                  key={m.id}
                  className={`pago-metodo${metodo === m.id ? ' pago-metodo--active' : ''}`}
                  onClick={() => setMetodo(m.id)}
                >
                  <div className="pago-metodo-icon">{getMetodoIcon(m.icon)}</div>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Paso 2: Datos de pago */}
        {paso === 2 && metodo === 'tarjeta' && (
          <div className="pago-body">
            <h3>Datos de la tarjeta</h3>
            <div className="pago-form">
              <div className="form-group">
                <label>Numero de tarjeta</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={formData.numeroTarjeta || ''}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                    updateField('numeroTarjeta', v.replace(/(.{4})/g, '$1 ').trim());
                  }}
                />
              </div>
              <div className="form-group">
                <label>Nombre del titular</label>
                <input
                  type="text"
                  placeholder="Como aparece en la tarjeta"
                  value={formData.nombreTitular || ''}
                  onChange={e => updateField('nombreTitular', e.target.value.toUpperCase())}
                />
              </div>
              <div className="pago-form-row">
                <div className="form-group">
                  <label>Fecha de expiracion</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    maxLength={5}
                    value={formData.expiracion || ''}
                    onChange={e => {
                      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                      updateField('expiracion', v);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="***"
                    maxLength={4}
                    value={formData.cvv || ''}
                    onChange={e => updateField('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {paso === 2 && metodo === 'transferencia' && (
          <div className="pago-body">
            <h3>Datos de transferencia</h3>
            <div className="pago-cuenta-destino">
              <div className="pago-cuenta-label">Cuenta destino ATM Centro Guayas</div>
              <div className="pago-cuenta-dato"><span>Banco:</span> Banco del Pacifico</div>
              <div className="pago-cuenta-dato"><span>Cuenta corriente:</span> 0750012345</div>
              <div className="pago-cuenta-dato"><span>RUC:</span> 0968000150001</div>
            </div>
            <div className="pago-form">
              <div className="form-group">
                <label>Banco de origen</label>
                <select value={formData.bancoOrigen || ''} onChange={e => updateField('bancoOrigen', e.target.value)}>
                  <option value="">Seleccione su banco</option>
                  {BANCOS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Numero de cuenta origen</label>
                <input
                  type="text"
                  placeholder="Ingrese el numero de cuenta"
                  value={formData.numeroCuenta || ''}
                  onChange={e => updateField('numeroCuenta', e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
          </div>
        )}

        {paso === 2 && metodo === 'deposito' && (
          <div className="pago-body">
            <h3>Datos del deposito</h3>
            <div className="pago-cuenta-destino">
              <div className="pago-cuenta-label">Cuenta destino ATM Centro Guayas</div>
              <div className="pago-cuenta-dato"><span>Banco:</span> Banco del Pacifico</div>
              <div className="pago-cuenta-dato"><span>Cuenta corriente:</span> 0750012345</div>
            </div>
            <div className="pago-form">
              <div className="form-group">
                <label>Banco donde realizo el deposito</label>
                <select value={formData.bancoDeposito || ''} onChange={e => updateField('bancoDeposito', e.target.value)}>
                  <option value="">Seleccione el banco</option>
                  {BANCOS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Numero de comprobante de deposito</label>
                <input
                  type="text"
                  placeholder="Ingrese el numero del comprobante"
                  value={formData.numeroDeposito || ''}
                  onChange={e => updateField('numeroDeposito', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Paso 3: Confirmacion */}
        {paso === 3 && (
          <div className="pago-body">
            <h3>Confirmar pago</h3>
            <div className="pago-confirmacion-detalle">
              <div className="pago-conf-row">
                <span>Concepto:</span>
                <strong>{concepto}</strong>
              </div>
              <div className="pago-conf-row">
                <span>Referencia:</span>
                <strong>{referencia}</strong>
              </div>
              <div className="pago-conf-row">
                <span>Metodo:</span>
                <strong>{METODOS_PAGO.find(m => m.id === metodo)?.label}</strong>
              </div>
              {metodo === 'tarjeta' && formData.numeroTarjeta && (
                <div className="pago-conf-row">
                  <span>Tarjeta:</span>
                  <strong>**** **** **** {formData.numeroTarjeta.replace(/\s/g, '').slice(-4)}</strong>
                </div>
              )}
              <div className="pago-conf-row pago-conf-row--total">
                <span>Total a pagar:</span>
                <strong>${typeof monto === 'number' ? monto.toFixed(2) : monto}</strong>
              </div>
            </div>
            <div className="pago-aviso">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Este es un entorno de simulacion. No se realizaran cargos reales.</span>
            </div>
          </div>
        )}

        {/* Paso 4: Exito */}
        {paso === 4 && (
          <div className="pago-body pago-exito">
            <div className="pago-exito-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" width="64" height="64">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Pago procesado exitosamente</h3>
            <p className="pago-exito-comprobante">
              Comprobante: <strong>PAG-{Date.now().toString().slice(-8)}</strong>
            </p>
            <div className="pago-confirmacion-detalle">
              <div className="pago-conf-row">
                <span>Concepto:</span>
                <strong>{concepto}</strong>
              </div>
              <div className="pago-conf-row">
                <span>Monto pagado:</span>
                <strong>${typeof monto === 'number' ? monto.toFixed(2) : monto}</strong>
              </div>
              <div className="pago-conf-row">
                <span>Fecha:</span>
                <strong>{new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              </div>
              <div className="pago-conf-row">
                <span>Estado:</span>
                <strong style={{ color: '#27ae60' }}>Aprobado</strong>
              </div>
            </div>
            <p className="pago-exito-nota">
              Se ha enviado el comprobante a su correo electronico registrado.
            </p>
          </div>
        )}

        {/* Footer / Acciones */}
        <div className="pago-modal-footer">
          {paso < 4 ? (
            <>
              <button className="btn btn-secondary" onClick={paso === 1 ? handleClose : () => setPaso(p => p - 1)}>
                {paso === 1 ? 'Cancelar' : 'Anterior'}
              </button>
              {paso < 3 ? (
                <button className="btn btn-primary" onClick={() => setPaso(p => p + 1)} disabled={!canProceed()}>
                  Continuar
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleProcesar} disabled={procesando}>
                  {procesando ? (
                    <>
                      <span className="spinner-small"></span>
                      Procesando pago...
                    </>
                  ) : (
                    <>Confirmar pago - ${typeof monto === 'number' ? monto.toFixed(2) : monto}</>
                  )}
                </button>
              )}
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleClose} style={{ width: '100%' }}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
