import { digitoDelMes } from '../../data/oficinas';

const months = [
  { label: 'Ene: Todos', digit: null },
  { label: 'Feb: 1', digit: 1 },
  { label: 'Mar: 2', digit: 2 },
  { label: 'Abr: 3', digit: 3 },
  { label: 'May: 4', digit: 4 },
  { label: 'Jun: 5', digit: 5 },
  { label: 'Jul: 6', digit: 6 },
  { label: 'Ago: 7', digit: 7 },
  { label: 'Sep: 8', digit: 8 },
  { label: 'Oct: 9', digit: 9 },
  { label: 'Nov: 0', digit: 0 },
  { label: 'Dic: Todos', digit: null },
];

export default function DigitoMes() {
  const currentDigit = digitoDelMes.digito;
  const mesNombre = digitoDelMes.mes;

  return (
    <section className="digito-section" aria-label="Digito de revision vehicular del mes">
      <div className="container">
      <div className="digito-banner">
        <div className="digito-grid">
          <div className="digito-left">
            <span className="digito-left__label">Digito del mes</span>
            <span className="digito-left__number">{currentDigit}</span>
            <span className="digito-left__month">{mesNombre}</span>
          </div>
          <div className="digito-right">
            <h2 className="digito-right__title">Revision Tecnica Vehicular</h2>
            <p className="digito-right__desc">
              En el mes actual corresponde la Revision Tecnica Vehicular para todos los vehiculos cuyo ultimo digito de placa termine en <strong>{currentDigit}</strong>. Acerquese a nuestras oficinas en Nobol, Pedro Carbo o Santa Lucia.
            </p>
            <div className="digito-months">
              {months.map((m, i) => (
                <span
                  key={i}
                  className={`digito-month${m.digit === currentDigit ? ' digito-month--active' : ''}`}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
