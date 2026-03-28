import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#d4edda', color: '#155724', border: '#27ae60' },
    error: { bg: '#f8d7da', color: '#721c24', border: '#e74c3c' },
    info: { bg: '#cce5ff', color: '#004085', border: '#0056b3' },
  };

  const style = colors[type] || colors.info;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
      background: style.bg, color: style.color, borderLeft: `4px solid ${style.border}`,
      padding: '14px 20px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      maxWidth: '400px', animation: 'slideIn 0.3s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <span>{message}</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: style.color }}>
          &times;
        </button>
      </div>
    </div>
  );
}
