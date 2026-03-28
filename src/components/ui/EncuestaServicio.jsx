import { useState } from 'react';

const PREGUNTAS = [
  { id: 'facilidad', texto: 'Facilidad de uso de la plataforma' },
  { id: 'claridad', texto: 'Claridad de la informacion proporcionada' },
  { id: 'rapidez', texto: 'Rapidez del proceso en linea' },
  { id: 'satisfaccion', texto: 'Satisfaccion general con el servicio' },
];

const ESTRELLAS_LABELS = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="encuesta-stars">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          className={`encuesta-star ${star <= (hover || value) ? 'filled' : ''}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${star} estrellas - ${ESTRELLAS_LABELS[star - 1]}`}
        >
          <svg viewBox="0 0 24 24" width="28" height="28"
            fill={star <= (hover || value) ? '#F59E0B' : 'none'}
            stroke={star <= (hover || value) ? '#F59E0B' : '#D1D5DB'}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      {(hover || value) > 0 && (
        <span className="encuesta-star-label">{ESTRELLAS_LABELS[(hover || value) - 1]}</span>
      )}
    </div>
  );
}

export default function EncuestaServicio({ tramiteNombre, onSubmit, onSkip }) {
  const [ratings, setRatings] = useState({});
  const [comentario, setComentario] = useState('');
  const [enviada, setEnviada] = useState(false);

  const allAnswered = PREGUNTAS.every(p => ratings[p.id] > 0);

  const handleSubmit = () => {
    const encuesta = {
      tramite: tramiteNombre,
      fecha: new Date().toISOString(),
      respuestas: ratings,
      promedioGeneral: Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length,
      comentario: comentario.trim() || null,
    };

    // Save to localStorage
    try {
      const encuestas = JSON.parse(localStorage.getItem('atm_encuestas') || '[]');
      encuestas.push(encuesta);
      localStorage.setItem('atm_encuestas', JSON.stringify(encuestas));
    } catch(e) { /* ignore */ }

    setEnviada(true);
    if (onSubmit) onSubmit(encuesta);
  };

  if (enviada) {
    return (
      <div className="encuesta encuesta--exito">
        <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" width="48" height="48">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h3>Gracias por su evaluacion</h3>
        <p>Su opinion nos ayuda a mejorar nuestros servicios. La retroalimentacion ciudadana es fundamental para la gestion institucional.</p>
      </div>
    );
  }

  return (
    <div className="encuesta">
      <div className="encuesta__header">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--azul-primario)" strokeWidth="2" width="24" height="24">
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
        </svg>
        <div>
          <h3>Evaluar servicio</h3>
          <p>Ayudenos a mejorar evaluando su experiencia con "{tramiteNombre}"</p>
        </div>
      </div>

      <div className="encuesta__preguntas">
        {PREGUNTAS.map(p => (
          <div key={p.id} className="encuesta__pregunta">
            <label>{p.texto}</label>
            <StarRating value={ratings[p.id] || 0} onChange={v => setRatings(prev => ({ ...prev, [p.id]: v }))} />
          </div>
        ))}
      </div>

      <div className="encuesta__comentario">
        <label htmlFor="enc-comentario">Comentarios adicionales (opcional)</label>
        <textarea
          id="enc-comentario"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          placeholder="Comparta su experiencia o sugerencias de mejora..."
          rows={3}
        />
      </div>

      <div className="encuesta__actions">
        <button className="btn btn-secondary" onClick={onSkip} type="button">
          Omitir encuesta
        </button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!allAnswered} type="button">
          Enviar evaluacion
        </button>
      </div>
    </div>
  );
}
