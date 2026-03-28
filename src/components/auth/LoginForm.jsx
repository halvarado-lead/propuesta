import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const returnUrl = location.state?.returnUrl || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    setIsSubmitting(true);
    const result = login(identifier.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(returnUrl, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">ATM</span>
          </div>
          <h1>ATM Centro Guayas - EP</h1>
          <p>Iniciar Sesion</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">!</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="identifier">Cedula o correo electronico</label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Ingrese su cedula o correo electronico"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contrasena</label>
            <div className="input-password">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contrasena"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Iniciar sesion'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            No tiene cuenta?{' '}
            <Link to="/registro">Registrese aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
