import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function TramiteWizard({ tramite, onComplete }) {
  const { saveTramite } = useAuth();
  const [pasoActual, setPasoActual] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [completado, setCompletado] = useState(false);
  const [tramiteGuardado, setTramiteGuardado] = useState(null);

  const pasos = tramite.pasos;
  const paso = pasos[pasoActual];
  const esUltimoPaso = pasoActual === pasos.length - 1;
  const esPasoRevision = paso.campos.length === 0 && !esUltimoPaso;

  const updateField = (nombre, valor) => {
    setFormData((prev) => ({ ...prev, [nombre]: valor }));
  };

  const handleFileChange = (nombre, file) => {
    setFiles((prev) => ({ ...prev, [nombre]: file }));
  };

  const canProceed = () => {
    if (esPasoRevision || esUltimoPaso) return true;
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
        {Object.entries(formData).map(([key, value]) => {
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
        <p className="text-muted mt-2">
          Puede consultar el estado de su tramite en su panel de control.
          Le notificaremos por correo electronico cuando haya actualizaciones.
        </p>
      </div>
    );
  };

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
    </div>
  );
}
