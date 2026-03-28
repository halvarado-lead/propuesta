// Multas simuladas por cedula (se generan al consultar)
const tiposInfraccion = [
  { codigo: 'C-001', tipo: 'Exceso de velocidad', articulo: 'Art. 142 LOTTTSV', puntos: 6, monto: 145.88 },
  { codigo: 'C-002', tipo: 'No respetar semaforo en rojo', articulo: 'Art. 143 LOTTTSV', puntos: 6, monto: 145.88 },
  { codigo: 'C-003', tipo: 'Conducir sin licencia', articulo: 'Art. 141 LOTTTSV', puntos: 10, monto: 291.76 },
  { codigo: 'C-004', tipo: 'Estacionamiento indebido', articulo: 'Art. 139 LOTTTSV', puntos: 3, monto: 72.94 },
  { codigo: 'C-005', tipo: 'No usar cinturon de seguridad', articulo: 'Art. 139 LOTTTSV', puntos: 3, monto: 72.94 },
  { codigo: 'C-006', tipo: 'Uso de celular al conducir', articulo: 'Art. 140 LOTTTSV', puntos: 6, monto: 145.88 },
  { codigo: 'C-007', tipo: 'Matricula caducada', articulo: 'Art. 139 LOTTTSV', puntos: 3, monto: 72.94 },
  { codigo: 'C-008', tipo: 'Conducir en estado de embriaguez', articulo: 'Art. 385 COIP', puntos: 30, monto: 583.52 },
  { codigo: 'C-009', tipo: 'No respetar paso peatonal', articulo: 'Art. 139 LOTTTSV', puntos: 3, monto: 72.94 },
  { codigo: 'C-010', tipo: 'Revision tecnica vencida', articulo: 'Art. 139 LOTTTSV', puntos: 3, monto: 72.94 },
];

const placasEjemplo = ['GBA-1234', 'GCA-5678', 'GDA-9012', 'GEA-3456'];
const lugaresEjemplo = ['Nobol - Via Daule Km 34', 'Pedro Carbo - Av. Principal', 'Santa Lucia - Via a Daule', 'Daule - Av. Leon Febres Cordero'];

function generarFechaAleatoria() {
  const start = new Date(2023, 0, 1);
  const end = new Date(2025, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

// Genera multas pseudo-aleatorias basadas en la cedula
export function consultarMultas(cedula) {
  if (!cedula || cedula.length < 10) return { success: false, error: 'Ingrese una cedula valida de 10 digitos.' };

  // Usar la cedula como semilla para generar resultados consistentes
  const seed = parseInt(cedula.slice(-4), 10);
  const cantidadMultas = seed % 5; // 0 a 4 multas

  if (cantidadMultas === 0) {
    return {
      success: true,
      multas: [],
      resumen: { total: 0, puntos: 0, monto: 0 }
    };
  }

  const multas = [];
  for (let i = 0; i < cantidadMultas; i++) {
    const infraccionIdx = (seed + i * 7) % tiposInfraccion.length;
    const infraccion = tiposInfraccion[infraccionIdx];
    const placaIdx = (seed + i) % placasEjemplo.length;
    const lugarIdx = (seed + i * 3) % lugaresEjemplo.length;
    const pagada = (seed + i) % 3 === 0;

    multas.push({
      id: `CIT-${String(seed * 1000 + i).padStart(8, '0')}`,
      ...infraccion,
      placa: placasEjemplo[placaIdx],
      fecha: generarFechaAleatoria(),
      lugar: lugaresEjemplo[lugarIdx],
      estado: pagada ? 'Pagada' : 'Pendiente',
    });
  }

  const pendientes = multas.filter(m => m.estado === 'Pendiente');

  return {
    success: true,
    multas,
    resumen: {
      total: multas.length,
      pendientes: pendientes.length,
      pagadas: multas.length - pendientes.length,
      puntos: pendientes.reduce((acc, m) => acc + m.puntos, 0),
      monto: pendientes.reduce((acc, m) => acc + m.monto, 0),
    }
  };
}

// Puntos de pago autorizados
export const puntosPago = [
  { nombre: 'Banco del Pacifico', tipo: 'Banco', direccion: 'Todas las agencias a nivel nacional' },
  { nombre: 'Banco de Guayaquil', tipo: 'Banco', direccion: 'Todas las agencias a nivel nacional' },
  { nombre: 'Produbanco', tipo: 'Banco', direccion: 'Todas las agencias a nivel nacional' },
  { nombre: 'Servipagos', tipo: 'Punto de pago', direccion: 'Centros autorizados' },
  { nombre: 'ATM Centro Guayas - Nobol', tipo: 'Ventanilla', direccion: 'Km. 34.5 via Daule, lotizacion Valle Esperanza' },
  { nombre: 'ATM Centro Guayas - Pedro Carbo', tipo: 'Ventanilla', direccion: 'Via E-482, junto al Registro Civil' },
];
