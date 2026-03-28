import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { tramites } from '../data/tramites';

const CATEGORIAS = [
  { key: 'todos', label: 'Todos' },
  { key: 'matriculacion', label: 'Matriculacion' },
  { key: 'documentos', label: 'Documentos' },
  { key: 'actualizacion', label: 'Actualizacion' },
];

function getIconSvg(iconName) {
  const svgProps = { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: '#003876', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (iconName) {
    case 'car':
      return (
        <svg {...svgProps}>
          <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...svgProps}>
          <path d="M1 4v6h6M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
        </svg>
      );
    case 'id-card':
      return (
        <svg {...svgProps}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="16" x2="14" y2="16" />
          <circle cx="8" cy="8" r="1" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...svgProps}>
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
    case 'wrench':
      return (
        <svg {...svgProps}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...svgProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
    case 'unlock':
      return (
        <svg {...svgProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 019.9-1" />
        </svg>
      );
    case 'document':
      return (
        <svg {...svgProps}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...svgProps}>
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
        </svg>
      );
    case 'shuffle':
    case 'swap':
      return (
        <svg {...svgProps}>
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
      );
    case 'home':
      return (
        <svg {...svgProps}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'user':
      return (
        <svg {...svgProps}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'vehicle':
    case 'truck':
      return (
        <svg {...svgProps}>
          <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

export default function ServiciosPage() {
  const [searchParams] = useSearchParams();
  const queryInicial = searchParams.get('q') || '';
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState(queryInicial);

  const filtrados = tramites.filter((t) => {
    const matchCategoria = filtro === 'todos' || t.categoria === filtro;
    const matchBusqueda = !busqueda || t.nombre.toLowerCase().includes(busqueda.toLowerCase()) || t.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Servicios y Tramites</h1>
          <p>Consulta los requisitos y realiza tus tramites vehiculares</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="text-center mb-3">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar tramites..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="servicios-filter">
            {CATEGORIAS.map((c) => (
              <button
                key={c.key}
                className={`filter-btn ${filtro === c.key ? 'active' : ''}`}
                onClick={() => setFiltro(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="servicios-grid">
            {filtrados.map((t) => (
              <div key={t.id} className="servicio-card">
                <div className="servicio-card-icon">{getIconSvg(t.icono)}</div>
                <h3>{t.nombre}</h3>
                <p>{t.descripcion}</p>
                <div className="servicio-card-actions">
                  <Link to={`/servicios/${t.slug}`} className="btn btn-outline btn-sm">Ver requisitos</Link>
                  {t.online && (
                    <Link to={`/tramite/${t.slug}`} className="btn btn-primary btn-sm">Hacer en linea</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filtrados.length === 0 && (
            <p className="text-center text-muted" style={{ padding: '40px 0' }}>
              No se encontraron tramites con los filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
