import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const searchTags = ['Matriculacion', 'Revision vehicular', 'Multas', 'Certificados RTV', 'Titulos habilitantes'];

export default function Hero() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/servicios?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/servicios?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="hero" aria-label="Informacion principal">
      <div className="container">
        <div className="hero__grid">
          <div>
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              Oficinas abiertas hoy: 08h00 - 17h00
            </div>
            <h1 className="hero__title">Portal de Servicios Ciudadanos</h1>
            <p className="hero__desc">Accede a los servicios de transito, matriculacion vehicular y revision tecnica de los cantones mancomunados del centro de la provincia del Guayas.</p>
            <div className="hero__actions">
              <a href="#servicios" className="btn btn--primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Ver tramites
              </a>
              <a href="#oficinas" className="btn btn--outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Ubicar oficinas
              </a>
            </div>
          </div>
          <div className="hero__search">
            <div className="hero__search-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Busca tu tramite o servicio
            </div>
            <form onSubmit={handleSearch}>
              <div className="hero__search-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="search"
                  className="hero__search-input"
                  placeholder="Ej: matriculacion, revision vehicular, multas..."
                  aria-label="Buscar tramite o servicio"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
            <div className="hero__search-tags">
              {searchTags.map((tag) => (
                <span
                  key={tag}
                  className="hero__search-tag"
                  onClick={() => handleTagClick(tag)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
