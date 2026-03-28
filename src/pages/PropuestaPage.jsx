import { useEffect, useRef } from 'react';

export default function PropuestaPage() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        try {
          const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
          if (doc && doc.body) {
            iframeRef.current.style.height = doc.body.scrollHeight + 40 + 'px';
          }
        } catch (e) {
          // cross-origin fallback
        }
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleResize);
    }

    return () => {
      if (iframe) iframe.removeEventListener('load', handleResize);
    };
  }, []);

  return (
    <div style={{ padding: '0', maxWidth: '100%' }}>
      <div style={{
        background: '#003876',
        color: 'white',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <h2 style={{ margin: 0, fontSize: '16px' }}>Propuesta Tecnica - Portal ATM Centro Guayas</h2>
        <a
          href="/propuesta/index.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'white',
            background: 'rgba(255,255,255,0.15)',
            padding: '6px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '13px'
          }}
        >
          Abrir en nueva ventana
        </a>
      </div>
      <iframe
        ref={iframeRef}
        src="/propuesta/index.html"
        title="Propuesta Tecnica"
        style={{
          width: '100%',
          minHeight: '100vh',
          height: '3000px',
          border: '1px solid #D1D5DB',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          background: 'white'
        }}
      />
    </div>
  );
}
