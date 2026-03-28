const secciones = [
  {
    titulo: 'Rendicion de Cuentas',
    items: [
      'Informe de Rendicion de Cuentas 2024',
      'Informe de Rendicion de Cuentas 2023',
      'Informe de Rendicion de Cuentas 2022',
      'Plan Operativo Anual (POA) 2025',
    ]
  },
  {
    titulo: 'Presupuesto Institucional',
    items: [
      'Presupuesto aprobado 2025',
      'Ejecucion presupuestaria 2024',
      'Estados financieros 2024',
      'Cedulas presupuestarias',
    ]
  },
  {
    titulo: 'Contratacion Publica',
    items: [
      'Procesos de contratacion vigentes',
      'Plan Anual de Contratacion (PAC) 2025',
      'Contratos suscritos 2024',
      'Informes de fiscalizacion',
    ]
  },
  {
    titulo: 'LOTAIP - Informacion Publica',
    items: [
      'Estructura organica funcional',
      'Directorio institucional',
      'Remuneraciones mensuales',
      'Servicios que ofrece la institucion',
      'Formularios y solicitudes',
      'Regulaciones y procedimientos internos',
    ]
  },
];

export default function TransparenciaPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Transparencia</h1>
          <p>Acceso a la informacion publica institucional</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="transparencia-grid">
            {secciones.map((s, i) => (
              <div key={i} className="card">
                <h3>{s.titulo}</h3>
                <ul className="transparencia-list">
                  {s.items.map((item, j) => (
                    <li key={j} className="transparencia-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
