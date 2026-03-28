import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CANTONES = [
  'Guayaquil',
  'Duran',
  'Samborondon',
  'Daule',
  'Milagro',
  'Naranjal',
  'El Triunfo',
];

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    canton: '',
    direccion: '',
    password: '',
    confirmarPassword: '',
    acceptTerms: false,
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!form.cedula || !form.nombres || !form.apellidos || !form.fechaNacimiento) {
      setError('Por favor complete todos los campos.');
      return false;
    }
    if (!/^\d{10}$/.test(form.cedula)) {
      setError('La cedula debe tener exactamente 10 digitos.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.email || !form.telefono || !form.canton || !form.direccion) {
      setError('Por favor complete todos los campos.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Ingrese un correo electronico valido.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!form.password || !form.confirmarPassword) {
      setError('Por favor complete todos los campos.');
      return false;
    }
    if (form.password.length < 8) {
      setError('La contrasena debe tener al menos 8 caracteres.');
      return false;
    }
    if (form.password !== form.confirmarPassword) {
      setError('Las contrasenas no coinciden.');
      return false;
    }
    if (!form.acceptTerms) {
      setError('Debe aceptar los terminos y condiciones.');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const prevStep = () => {
    setError('');
    setStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    const { confirmarPassword, acceptTerms, ...data } = form;
    const result = register(data);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container auth-container-wide">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">ATM</span>
          </div>
          <h1>ATM Centro Guayas - EP</h1>
          <p>Crear cuenta</p>
        </div>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Datos personales</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Contacto</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Seguridad</span>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">!</span>
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="cedula">Cedula de identidad</label>
                <input
                  type="text"
                  id="cedula"
                  value={form.cedula}
                  onChange={(e) => updateField('cedula', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Ingrese su numero de cedula (10 digitos)"
                  maxLength={10}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombres">Nombres</label>
                <input
                  type="text"
                  id="nombres"
                  value={form.nombres}
                  onChange={(e) => updateField('nombres', e.target.value)}
                  placeholder="Ingrese sus nombres"
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  value={form.apellidos}
                  onChange={(e) => updateField('apellidos', e.target.value)}
                  placeholder="Ingrese sus apellidos"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  value={form.fechaNacimiento}
                  onChange={(e) => updateField('fechaNacimiento', e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="email">Correo electronico</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Ingrese su correo electronico"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="tel"
                  id="telefono"
                  value={form.telefono}
                  onChange={(e) => updateField('telefono', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Ingrese su numero de telefono"
                  maxLength={10}
                />
              </div>
              <div className="form-group">
                <label htmlFor="canton">Canton</label>
                <select
                  id="canton"
                  value={form.canton}
                  onChange={(e) => updateField('canton', e.target.value)}
                >
                  <option value="">Seleccione un canton</option>
                  {CANTONES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Direccion</label>
                <input
                  type="text"
                  id="direccion"
                  value={form.direccion}
                  onChange={(e) => updateField('direccion', e.target.value)}
                  placeholder="Ingrese su direccion domiciliaria"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="password">Contrasena</label>
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Minimo 8 caracteres"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmarPassword">Confirmar contrasena</label>
                <input
                  type="password"
                  id="confirmarPassword"
                  value={form.confirmarPassword}
                  onChange={(e) => updateField('confirmarPassword', e.target.value)}
                  placeholder="Repita su contrasena"
                />
              </div>
              <div className="form-group form-group-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(e) => updateField('acceptTerms', e.target.checked)}
                  />
                  Acepto los terminos y condiciones y la politica de privacidad
                </label>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Anterior
              </button>
            )}
            {step < 3 && (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Siguiente
              </button>
            )}
            {step === 3 && (
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            )}
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Ya tiene cuenta?{' '}
            <Link to="/login">Inicie sesion</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
