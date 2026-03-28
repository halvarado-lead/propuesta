import { useState, useMemo } from 'react';

const HORARIOS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30'
];

const OFICINAS = [
  { id: 'nobol', nombre: 'Oficina Nobol', direccion: 'Km. 34.5 via Daule, Nobol' },
  { id: 'pedro-carbo', nombre: 'Oficina Pedro Carbo', direccion: 'Via E-482, Pedro Carbo' },
  { id: 'santa-lucia', nombre: 'Oficina Santa Lucia', direccion: 'Av. 3 de Febrero, Santa Lucia' },
];

function getNextBusinessDays(count = 15) {
  const days = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function getRandomOcupados(fecha) {
  const seed = fecha.getDate() * 7 + fecha.getMonth() * 31;
  const ocupados = [];
  HORARIOS.forEach((h, i) => {
    if ((seed + i * 13) % 5 === 0) ocupados.push(h);
  });
  return ocupados;
}

export default function AgendarCita({ onAgendar, citaActual, modoReagendar = false }) {
  const [oficina, setOficina] = useState(citaActual?.oficina || '');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(citaActual?.fecha || '');
  const [horaSeleccionada, setHoraSeleccionada] = useState(citaActual?.hora || '');

  const diasDisponibles = useMemo(() => getNextBusinessDays(15), []);

  const ocupados = useMemo(() => {
    if (!fechaSeleccionada) return [];
    return getRandomOcupados(new Date(fechaSeleccionada));
  }, [fechaSeleccionada]);

  const formatFecha = (d) => d.toLocaleDateString('es-EC', { weekday: 'short', day: 'numeric', month: 'short' });
  const formatFechaValue = (d) => d.toISOString().split('T')[0];

  const handleConfirmar = () => {
    if (oficina && fechaSeleccionada && horaSeleccionada) {
      const oficinaData = OFICINAS.find(o => o.id === oficina);
      onAgendar({
        oficina,
        oficinaNombre: oficinaData?.nombre,
        oficinaDireccion: oficinaData?.direccion,
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        fechaTexto: new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-EC', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        }),
      });
    }
  };

  return (
    <div className="agendar-cita">
      <div className="agendar-cita__header">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--azul-primario)" strokeWidth="2" width="24" height="24">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <div>
          <h3>{modoReagendar ? 'Reagendar cita' : 'Agendar cita presencial'}</h3>
          <p>Seleccione la oficina, fecha y horario para su atencion</p>
        </div>
      </div>

      {/* Oficina */}
      <div className="agendar-cita__section">
        <label className="agendar-cita__label">Oficina de atencion</label>
        <div className="agendar-cita__oficinas">
          {OFICINAS.map(o => (
            <button
              key={o.id}
              className={`agendar-cita__oficina ${oficina === o.id ? 'active' : ''}`}
              onClick={() => setOficina(o.id)}
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <strong>{o.nombre}</strong>
                <span>{o.direccion}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fecha */}
      {oficina && (
        <div className="agendar-cita__section">
          <label className="agendar-cita__label">Fecha disponible</label>
          <div className="agendar-cita__fechas">
            {diasDisponibles.map(d => {
              const val = formatFechaValue(d);
              return (
                <button
                  key={val}
                  className={`agendar-cita__fecha ${fechaSeleccionada === val ? 'active' : ''}`}
                  onClick={() => { setFechaSeleccionada(val); setHoraSeleccionada(''); }}
                  type="button"
                >
                  <span className="agendar-cita__fecha-dia">{d.getDate()}</span>
                  <span className="agendar-cita__fecha-mes">
                    {d.toLocaleDateString('es-EC', { weekday: 'short' })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hora */}
      {fechaSeleccionada && (
        <div className="agendar-cita__section">
          <label className="agendar-cita__label">Horario disponible</label>
          <div className="agendar-cita__horas">
            {HORARIOS.map(h => {
              const ocupado = ocupados.includes(h);
              return (
                <button
                  key={h}
                  className={`agendar-cita__hora ${horaSeleccionada === h ? 'active' : ''} ${ocupado ? 'disabled' : ''}`}
                  onClick={() => !ocupado && setHoraSeleccionada(h)}
                  disabled={ocupado}
                  type="button"
                >
                  {h}
                </button>
              );
            })}
          </div>
          <p className="agendar-cita__leyenda">
            <span className="dot dot--disponible"></span> Disponible
            <span className="dot dot--ocupado"></span> No disponible
          </p>
        </div>
      )}

      {/* Resumen */}
      {oficina && fechaSeleccionada && horaSeleccionada && (
        <div className="agendar-cita__resumen">
          <h4>Resumen de la cita</h4>
          <div className="agendar-cita__resumen-grid">
            <div><span>Oficina:</span><strong>{OFICINAS.find(o => o.id === oficina)?.nombre}</strong></div>
            <div>
              <span>Fecha:</span>
              <strong>
                {new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-EC', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                })}
              </strong>
            </div>
            <div><span>Hora:</span><strong>{horaSeleccionada}</strong></div>
          </div>
          <button className="btn btn-primary" onClick={handleConfirmar} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {modoReagendar ? 'Confirmar reagendamiento' : 'Confirmar cita'}
          </button>

          <p className="agendar-cita__nota">
            Podra reagendar su cita hasta 24 horas antes de la fecha programada.
          </p>
        </div>
      )}
    </div>
  );
}
