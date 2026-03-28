import { Link } from 'react-router-dom';

const items = [
  {
    titulo: 'Organigrama',
    desc: 'Estructura institucional',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    titulo: 'Presupuesto',
    desc: 'Informacion financiera',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
    ),
  },
  {
    titulo: 'Contrataciones',
    desc: 'Procesos y contratos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    ),
  },
  {
    titulo: 'Rendicion de Cuentas',
    desc: 'Informes anuales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    ),
  },
];

const arrowSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default function TransparenciaSection() {
  return (
    <section className="section section--blue-light" aria-labelledby="transparencia-titulo">
      <div className="container">
        <div className="section__header">
          <div className="section__overline">Ley Organica de Transparencia - LOTAIP</div>
          <h2 className="section__title" id="transparencia-titulo">Transparencia y Acceso a la Informacion</h2>
          <p className="section__subtitle">En cumplimiento del Art. 7 de la Ley Organica de Transparencia y Acceso a la Informacion Publica.</p>
        </div>

        <div className="transparencia-grid">
          {items.map((item, i) => (
            <Link to="/transparencia" key={i} className="transparencia-card" style={{ textDecoration: 'none' }}>
              <div className="transparencia-card__icon">
                {item.icon}
              </div>
              <div className="transparencia-card__title">{item.titulo}</div>
              <div className="transparencia-card__desc">{item.desc}</div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link to="/transparencia" className="btn btn--blue">
            Acceder a toda la informacion LOTAIP
            {arrowSvg}
          </Link>
        </div>
      </div>
    </section>
  );
}
