import { useEffect, useState } from 'react';

export default function PropuestaPage() {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/propuesta/index.html')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la propuesta');
        return res.text();
      })
      .then(text => {
        // Extract body content and style
        const styleMatch = text.match(/<style>([\s\S]*?)<\/style>/);
        const bodyMatch = text.match(/<body>([\s\S]*?)<\/body>/);

        if (bodyMatch) {
          const style = styleMatch ? `<style>${styleMatch[1]}</style>` : '';
          setHtml(style + bodyMatch[1]);
        } else {
          setHtml(text);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ marginTop: '16px', color: '#6B7280' }}>Cargando propuesta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ color: '#DC2626' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <div
        className="propuesta-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
