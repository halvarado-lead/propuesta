import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PagoOnlineModal from '../ui/PagoOnlineModal';

export default function TramiteWizard({ tramite, onComplete }) {
  const { saveTramite } = useAuth();
  const [pasoActual, setPasoActual] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [completado, setCompletado] = useState(false);
  const [tramiteGuardado, setTramiteGuardado] = useState(null);
  const [pagoModal, setPagoModal] = useState(false);
  const [pagado, setPagado] = useState(false);

  const pasos = tramite.pasos;
  const paso = pasos[pasoActual];
  const esUltimoPaso = pasoActual === pasos.length - 1;
  const esPasoRevision = paso.campos.length === 0 && !esUltimoPaso;
  const esPasoPago = paso.titulo.toLowerCase().includes('pago');

  const updateField = (nombre, valor) => {
    setFormData((prev) => ({ ...prev, [nombre]: valor }));
  };

  const handleFileChange = (nombre, file) => {
    setFiles((prev) => ({ ...prev, [nombre]: file }));
  };

  const canProceed = () => {
    if (esPasoRevision || esUltimoPaso) return true;
    if (esPasoPago) return pagado;
    return paso.campos.every((campo) => {
      if (!campo.required) return true;
      if (campo.tipo === 'file') return !!files[campo.nombre];
      return !!formData[campo.nombre];
    });
  };

  const siguiente = () => {
    if (esUltimoPaso && !completado) {
      const saved = saveTramite({
        nombreTramite: tramite.nombre,
        slug: tramite.slug,
        datos: formData,
        archivos: Object.keys(files).map((k) => ({ campo: k, nombre: files[k]?.name })),
      });
      setTramiteGuardado(saved);
      setCompletado(true);
      return;
    }
    if (pasoActual < pasos.length - 1) {
      setPasoActual((p) => p + 1);
    }
  };

  const anterior = () => {
    if (pasoActual > 0) setPasoActual((p) => p - 1);
  };

  const handlePagoExitoso = (datoPago) => {
    setPagado(true);
    setFormData(prev => ({
      ...prev,
      pagoComprobante: datoPago.comprobante,
      pagoMetodo: datoPago.metodo,
      pagoFecha: datoPago.fecha,
    }));
  };

  const renderCampo = (campo) => {
    if (campo.tipo === 'file') {
      const hasFile = !!files[campo.nombre];
      return (
        <div key={campo.nombre} className="form-group">
          <label>{campo.label} {campo.required && '*'}</label>
          <div className={`file-upload ${hasFile ? 'has-file' : ''}`}>
            <input
              type="file"
              onChange={(e) => handleFileChange(campo.nombre, e.target.files[0])}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="file-upload-label">
              {hasFile ? (
                <>{files[campo.nombre].name}</>
              ) : (
                <><strong>Haga clic</strong> o arrastre un archivo aqui</>
              )}
            </p>
          </div>
        </div>
      );
    }

    if (campo.tipo === 'select') {
      return (
        <div key={campo.nombre} className="form-group">
          <label htmlFor={campo.nombre}>{campo.label} {campo.required && '*'}</label>
          <select
            id={campo.nombre}
            value={formData[campo.nombre] || ''}
            onChange={(e) => updateField(campo.nombre, e.target.value)}
          >
            <option value="">Seleccione una opcion</option>
            {campo.opciones.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={campo.nombre} className="form-group">
        <label htmlFor={campo.nombre}>{campo.label} {campo.required && '*'}</label>
        <input
          type={campo.tipo}
          id={campo.nombre}
          value={formData[campo.nombre] || ''}
          onChange={(e) => updateField(campo.nombre, e.target.value)}
          placeholder={`Ingrese ${campo.label.toLowerCase()}`}
        />
      </div>
    );
  };

  const renderRevision = () => (
    <div className="wizard-summary">
      <h3 className="mb-2">Resumen de datos ingresados</h3>
      <dl>
        {Object.entries(formData).filter(([key]) => !key.startsWith('pago')).map(([key, value]) => {
          const campo = pasos.flatMap((p) => p.campos).find((c) => c.nombre === key);
          return (
            <div key={key} style={{ display: 'contents' }}>
              <dt>{campo?.label || key}</dt>
              <dd>{value}</dd>
            </div>
          );
        })}
        {Object.entries(files).map(([key, file]) => {
          const campo = pasos.flatMap((p) => p.campos).find((c) => c.nombre === key);
          return (
            <div key={key} style={{ display: 'contents' }}>
              <dt>{campo?.label || key}</dt>
              <dd>{file?.name}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );

  const renderPasoPago = () => (
    <div className="wizard-pago">
      <div className="wizard-pago-info">
        <h3>Pago del tramite</h3>
        <p>Para continuar con su tramite, debe realizar el pago correspondiente.</p>
        <div className="wizard-pago-detalle">
          <div className="wizard-pago-row">
            <span>Tramite:</span>
            <strong>{tramite.nombre}</strong>
          </div>
          <div className="wizard-pago-row">
            <span>Costo aproximado:</span>
            <strong>{tramite.costoAproximado}</strong>
          </div>
        </div>
      </div>
      {pagado ? (
        <div className="wizard-pago-exito">
          <svg viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" width="40" height="40">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <strong>Pago realizado exitosamente</strong>
            <p>Comprobante: {formData.pagoComprobante}</p>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary btn-lg" onClick={() => setPagoModal(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          Realizar pago en linea
        </button>
      )}
      {paso.campos.length > 0 && !pagado && (
        <div style={{ marginTop: 24 }}>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: 12 }}>
            Si ya realizo el pago por otro medio, ingrese los datos manualmente:
          </p>
          <div className="form-step">
            {paso.campos.map(renderCampo)}
          </div>
        </div>
      )}
    </div>
  );

  const renderConfirmacion = () => {
    if (!completado) {
      return renderRevision();
    }
    return (
      <div className="wizard-confirmacion">
        <div className="wizard-success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2>Tramite enviado exitosamente</h2>
        <p>Su solicitud ha sido registrada y sera procesada por nuestro equipo.</p>
        <div className="numero-tramite">ATM-{String(tramiteGuardado?.id).slice(-6)}</div>
        <p><strong>Estado:</strong> En revision</p>
        {pagado && <p><strong>Pago:</strong> Confirmado - {formData.pagoComprobante}</p>}
        <p className="text-muted mt-2">
          Puede consultar el estado de su tramite en su panel de control.
          Le notificaremos por correo electronico cuando haya actualizaciones.
        </p>
      </div>
    );
  };

  // Extract cost number for payment modal
  const costoNum = parseFloat((tramite.costoAproximado || '').replace(/[^0-9.]/g, '')) || 62;

  return (
    <div className="wizard">
      <div className="wizard-content">
        <div className="step-indicator">
          {pasos.map((p, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {i > 0 && <div className="step-line" />}
              <div className={`step ${i === pasoActual ? 'active' : ''} ${i < pasoActual ? 'completed' : ''}`}>
                <span className="step-number">{i + 1}</span>
                <span className="step-label">{p.titulo}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="wizard-step">
          <h2>{paso.titulo}</h2>

          {esUltimoPaso ? (
            renderConfirmacion()
          ) : esPasoPago ? (
            renderPasoPago()
          ) : esPasoRevision ? (
            renderRevision()
          ) : (
            <div className="form-step">
              {paso.campos.map(renderCampo)}
            </div>
          )}

          {!completado && (
            <div className="wizard-actions">
              <button
                className="btn btn-secondary"
                onClick={anterior}
                disabled={pasoActual === 0}
              >
                Anterior
              </button>
              <button
                className="btn btn-primary"
                onClick={siguiente}
                disabled={!canProceed()}
              >
                {esUltimoPaso ? 'Enviar tramite' : 'Siguiente'}
              </button>
            </div>
          )}

          {completado && (
            <div className="text-center mt-3">
              <a href="/dashboard" className="btn btn-primary">Ir al panel de control</a>
            </div>
          )}
        </div>
      </div>

      <PagoOnlineModal
        isOpen={pagoModal}
        onClose={() => setPagoModal(false)}
        concepto={tramite.nombre}
        monto={costoNum}
        referencia={`TRM-${Date.now().toString().slice(-6)}`}
        onPagoExitoso={handlePagoExitoso}
      />
    </div>
  );
}
