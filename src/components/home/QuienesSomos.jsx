import { Link } from 'react-router-dom';

const cantones = ['Colimes', 'Isidro Ayora', 'Lomas de Sargentillo', 'Nobol', 'Palestina', 'Pedro Carbo', 'Santa Lucia'];

export default function QuienesSomos() {
  return (
    <section className="section" aria-labelledby="about-titulo">
      <div className="container">
        <div className="about-grid">
          <div className="about__image">
            <img
              src="https://web.archive.org/web/20250320151454im_/https://atmcentroguayas.gob.ec/images/FOTO_6_QUIENES_SOMOS-compressed.jpg"
              alt="Instalaciones de ATM Centro Guayas EP"
              loading="lazy"
              onError={(e) => { e.target.parentElement.innerHTML = '<div style="padding:40px;text-align:center;color:var(--gris-400)">Imagen de las instalaciones de ATM Centro Guayas</div>'; }}
            />
          </div>
          <div>
            <div className="about__overline">Acerca de la institucion</div>
            <h2 className="about__title" id="about-titulo">ATM Centro Guayas - EP</h2>
            <p className="about__text">Somos una institucion publica tecnica, especializada en materia de transporte terrestre, transito y seguridad vial, constituida dentro del marco de la Mancomunidad de Movilidad Centro Guayas.</p>
            <p className="about__text">Ejercemos las competencias de transito en los cantones mancomunados de la provincia del Guayas:</p>
            <div className="about__cantones">
              {cantones.map((c) => (
                <span key={c} className="canton-badge">{c}</span>
              ))}
            </div>
            <Link to="/institucion" className="btn btn--blue">
              Conocer mas sobre la ATM
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
