export default function InstitucionPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Institucion</h1>
          <p>Conozca la Autoridad de Transito Municipal del Centro de la Provincia del Guayas</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="card mb-3">
            <h2>Quienes Somos</h2>
            <p>
              La Autoridad de Transito Municipal del Centro de la Provincia del Guayas - Empresa Publica
              (ATM Centro Guayas EP) es la entidad encargada de regular y controlar el transito y transporte
              terrestre en los cantones de Daule, Samborondon, Duran, Milagro, Naranjal y El Triunfo.
            </p>
            <p>
              Fue creada mediante ordenanza de la Mancomunidad de Transito del Centro de la Provincia del
              Guayas, con el objetivo de brindar servicios de calidad en materia de transito, transporte
              terrestre y seguridad vial.
            </p>
          </div>

          <div className="institucion-mission-grid">
            <div className="card">
              <h2>Mision</h2>
              <p>
                Regular y controlar el transito y transporte terrestre en los cantones de la mancomunidad
                del centro de la provincia del Guayas, garantizando la seguridad vial mediante procesos
                eficientes y tecnologia de punta, contribuyendo al desarrollo ordenado de la movilidad
                en la region.
              </p>
            </div>
            <div className="card">
              <h2>Vision</h2>
              <p>
                Ser referente nacional en gestion de transito y transporte terrestre, reconocida por
                su eficiencia, transparencia y compromiso con la seguridad vial, implementando soluciones
                innovadoras que faciliten los tramites ciudadanos y promuevan una cultura de respeto
                a las normas de transito.
              </p>
            </div>
          </div>

          <div className="card mt-3">
            <h2>Valores Institucionales</h2>
            <div className="valores-grid">
              {[
                { titulo: 'Transparencia', desc: 'Gestion abierta y rendicion de cuentas' },
                { titulo: 'Eficiencia', desc: 'Optimizacion de recursos y procesos' },
                { titulo: 'Servicio', desc: 'Atencion de calidad a la ciudadania' },
                { titulo: 'Integridad', desc: 'Actuacion etica en todas las funciones' },
                { titulo: 'Innovacion', desc: 'Mejora continua con tecnologia' },
                { titulo: 'Responsabilidad', desc: 'Compromiso con la seguridad vial' },
              ].map((v, i) => (
                <div key={i} className="valor-item">
                  <h3>{v.titulo}</h3>
                  <p className="text-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-3">
            <h2>Cantones de la Mancomunidad</h2>
            <p>ATM Centro Guayas EP tiene jurisdiccion en los siguientes cantones de la provincia del Guayas:</p>
            <div className="cantones-grid">
              {['Daule', 'Samborondon', 'Duran', 'Milagro', 'Naranjal', 'El Triunfo'].map((canton) => (
                <div key={canton} className="canton-item">
                  {canton}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
