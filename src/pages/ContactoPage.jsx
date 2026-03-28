import { useState } from 'react';
import { contacto, oficinas } from '../data/oficinas';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  const PhoneSvg = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003876" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );

  const EmailSvg = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003876" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const LocationSvg = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003876" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const ClockSvg = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003876" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contacto</h1>
          <p>Estamos para servirle. Comuniquese con nosotros</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="contacto-grid">
            <div className="contacto-info">
              <h2>Informacion de contacto</h2>
              <div className="contacto-item">
                <span className="contacto-item-icon"><PhoneSvg /></span>
                <div className="contacto-item-text">
                  <strong>Telefono</strong>
                  <span>{contacto.telefono}</span>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-item-icon"><EmailSvg /></span>
                <div className="contacto-item-text">
                  <strong>Email</strong>
                  <span>{contacto.email}</span>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-item-icon"><LocationSvg /></span>
                <div className="contacto-item-text">
                  <strong>Direccion</strong>
                  <span>{contacto.direccion}</span>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-item-icon"><ClockSvg /></span>
                <div className="contacto-item-text">
                  <strong>Horario</strong>
                  <span>{contacto.horarioAtencion}</span>
                </div>
              </div>

              <h3 className="mt-3">Nuestras oficinas</h3>
              <div className="oficinas-grid" style={{ gridTemplateColumns: '1fr' }}>
                {oficinas.map((o) => (
                  <div key={o.id} className="oficina-card">
                    <h3 style={{ fontSize: '1rem' }}>{o.nombre}</h3>
                    <p>{o.direccion}</p>
                    <p>{o.telefono}</p>
                    <p className="oficina-horario">{o.horario}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contacto-form">
              <h2>Enviar mensaje</h2>
              {enviado && (
                <div className="alert alert-success">
                  Mensaje enviado correctamente. Nos comunicaremos con usted pronto.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input type="text" id="nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electronico</label>
                  <input type="email" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="asunto">Asunto</label>
                  <input type="text" id="asunto" value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea id="mensaje" value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Enviar mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
