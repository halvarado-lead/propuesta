import { Link } from 'react-router-dom';

function getServiceIcon(iconName) {
  const icons = {
    car: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6"/><path d="M14 7l4 5h-5v-5h1z"/></svg>
    ),
    refresh: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
    ),
    'id-card': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
  };
  return icons[iconName] || icons.car;
}

const arrowSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const servicios = [
  {
    title: 'Matriculacion Vehicular',
    desc: 'Matriculacion por primera vez, renovacion anual, transferencia de dominio y duplicados de matricula o placas.',
    icon: 'car',
    color: 'blue',
    link: '/servicios/matriculacion-primera-vez',
    linkText: 'Ver requisitos',
  },
  {
    title: 'Revision Tecnica Vehicular',
    desc: 'Revision tecnica obligatoria para vehiculos segun el calendario de digitos. Certificados RTV disponibles en linea.',
    icon: 'refresh',
    color: 'green',
    link: '/servicios',
    linkText: 'Consultar certificados',
  },
  {
    title: 'Titulos Habilitantes',
    desc: 'Servicios para transporte publico, taxi convencional, taxi ejecutivo, expreso escolar e institucional, y tricimotos.',
    icon: 'id-card',
    color: 'blue',
    link: '/servicios',
    linkText: 'Mas informacion',
  },
  {
    title: 'Consulta de Multas',
    desc: 'Verifique si tiene infracciones de transito pendientes y conozca los puntos de pago autorizados por ATM Centro Guayas.',
    icon: 'edit',
    color: 'amber',
    link: '/servicios',
    linkText: 'Consultar ahora',
  },
  {
    title: 'Senaletica Vial',
    desc: 'Fabricacion e implementacion de senaletica vertical y horizontal en vias urbanas y carreteras de los cantones mancomunados.',
    icon: 'wrench',
    color: 'green',
    link: '/servicios',
    linkText: 'Ver mas',
  },
  {
    title: 'Seguridad Vial',
    desc: 'Programas de educacion y concientizacion en seguridad vial para los siete cantones de la Mancomunidad.',
    icon: 'lock',
    color: 'blue',
    link: '/servicios',
    linkText: 'Conocer programas',
  },
];

export default function ServiciosGrid() {
  return (
    <section id="servicios" className="section section--gray" aria-labelledby="servicios-titulo">
      <div className="container">
        <div className="section__header">
          <div className="section__overline">Servicios ciudadanos</div>
          <h2 className="section__title" id="servicios-titulo">Servicios y Tramites</h2>
          <p className="section__subtitle">Acceda de forma rapida a los servicios que necesita. Toda la informacion, requisitos y puntos de atencion en un solo lugar.</p>
        </div>

        <div className="servicios-grid">
          {servicios.map((s, i) => (
            <Link to={s.link} key={i} className="servicio-card" tabIndex={0} role="article" style={{ textDecoration: 'none' }}>
              <div className={`servicio-card__icon servicio-card__icon--${s.color}`}>
                {getServiceIcon(s.icon)}
              </div>
              <h3 className="servicio-card__title">{s.title}</h3>
              <p className="servicio-card__desc">{s.desc}</p>
              <span className="servicio-card__link">
                {s.linkText}
                {arrowSvg}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
