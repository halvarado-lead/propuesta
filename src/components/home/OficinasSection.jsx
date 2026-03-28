import { oficinas } from '../../data/oficinas';

const locationSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

const clockSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default function OficinasSection() {
  return (
    <section id="oficinas" className="section section--gray" aria-labelledby="oficinas-titulo">
      <div className="container">
        <div className="section__header">
          <div className="section__overline">Puntos de atencion</div>
          <h2 className="section__title" id="oficinas-titulo">Centros de Matriculacion y Revision Vehicular</h2>
          <p className="section__subtitle">Tres oficinas para atenderle. Horario de atencion: lunes a viernes de 08h00 a 17h00.</p>
        </div>

        <div className="oficinas-grid">
          {oficinas.map((o) => (
            <div key={o.id} className="oficina-card">
              <div className="oficina-card__img">
                <img
                  src={o.imagen}
                  alt={`Centro de Matriculacion de ${o.nombre}`}
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="oficina-card__body">
                <h3 className="oficina-card__name">{o.nombre}</h3>
                <div className="oficina-card__detail">
                  {locationSvg}
                  {o.direccion}
                </div>
                <div className="oficina-card__detail">
                  {clockSvg}
                  {o.horario}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
