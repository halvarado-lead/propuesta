export const tramites = [
  {
    id: 1,
    slug: 'matriculacion-primera-vez',
    nombre: 'Matriculacion Primera Vez',
    descripcion: 'Emision de matricula vehicular por primera vez para vehiculos nuevos o importados.',
    categoria: 'matriculacion',
    icono: 'car',
    online: true,
    requisitos: [
      'Factura comercial original',
      'Carta de venta original del concesionario',
      'Cedula de identidad del propietario (original y copia)',
      'Certificado de votacion vigente',
      'Improntas vehiculares (chasis y motor)',
      'SOAT vigente',
      'Certificado de revision tecnica vehicular'
    ],
    costoAproximado: '$62.00 - $120.00',
    tiempoEstimado: '5-10 dias habiles',
    pasos: [
      {
        titulo: 'Informacion del vehiculo',
        campos: [
          { nombre: 'tipoVehiculo', tipo: 'select', label: 'Tipo de vehiculo', required: true, opciones: ['Automovil', 'Motocicleta', 'Camioneta', 'Camion', 'Bus'] },
          { nombre: 'marca', tipo: 'text', label: 'Marca', required: true },
          { nombre: 'modelo', tipo: 'text', label: 'Modelo', required: true },
          { nombre: 'anio', tipo: 'number', label: 'Ano de fabricacion', required: true },
          { nombre: 'color', tipo: 'text', label: 'Color', required: true },
          { nombre: 'chasis', tipo: 'text', label: 'Numero de chasis', required: true },
          { nombre: 'motor', tipo: 'text', label: 'Numero de motor', required: true }
        ]
      },
      {
        titulo: 'Carga de documentos',
        campos: [
          { nombre: 'docFactura', tipo: 'file', label: 'Factura comercial', required: true },
          { nombre: 'docCartaVenta', tipo: 'file', label: 'Carta de venta original', required: true },
          { nombre: 'docCedula', tipo: 'file', label: 'Cedula de identidad', required: true },
          { nombre: 'docVotacion', tipo: 'file', label: 'Certificado de votacion', required: true },
          { nombre: 'docImprontas', tipo: 'file', label: 'Improntas vehiculares', required: true }
        ]
      },
      {
        titulo: 'Revision de datos',
        campos: []
      },
      {
        titulo: 'Pago',
        campos: [
          { nombre: 'metodoPago', tipo: 'select', label: 'Metodo de pago', required: true, opciones: ['Transferencia bancaria', 'Deposito bancario'] },
          { nombre: 'referenciaPago', tipo: 'text', label: 'Numero de referencia/comprobante', required: true }
        ]
      },
      {
        titulo: 'Confirmacion',
        campos: []
      }
    ]
  },
  {
    id: 2,
    slug: 'renovacion-matricula',
    nombre: 'Renovacion de Matricula',
    descripcion: 'Renovacion anual de la matricula vehicular. Obligatoria segun el digito de la placa.',
    categoria: 'matriculacion',
    icono: 'refresh',
    online: true,
    requisitos: [
      'Matricula del ano anterior (original)',
      'Cedula de identidad del propietario',
      'Revision tecnica vehicular vigente',
      'SOAT vigente',
      'No tener multas pendientes'
    ],
    costoAproximado: '$42.00 - $85.00',
    tiempoEstimado: '3-5 dias habiles',
    pasos: [
      {
        titulo: 'Datos del vehiculo',
        campos: [
          { nombre: 'placa', tipo: 'text', label: 'Numero de placa', required: true },
          { nombre: 'matriculaNumero', tipo: 'text', label: 'Numero de matricula', required: true }
        ]
      },
      {
        titulo: 'Carga de documentos',
        campos: [
          { nombre: 'docMatricula', tipo: 'file', label: 'Matricula anterior', required: true },
          { nombre: 'docCedula', tipo: 'file', label: 'Cedula de identidad', required: true },
          { nombre: 'docRevision', tipo: 'file', label: 'Revision tecnica vehicular', required: true },
          { nombre: 'docSOAT', tipo: 'file', label: 'SOAT vigente', required: true }
        ]
      },
      {
        titulo: 'Pago',
        campos: [
          { nombre: 'metodoPago', tipo: 'select', label: 'Metodo de pago', required: true, opciones: ['Transferencia bancaria', 'Deposito bancario'] },
          { nombre: 'referenciaPago', tipo: 'text', label: 'Numero de referencia/comprobante', required: true }
        ]
      },
      {
        titulo: 'Confirmacion',
        campos: []
      }
    ]
  },
  {
    id: 3,
    slug: 'duplicado-placas',
    nombre: 'Duplicado de Placas',
    descripcion: 'Solicitud de duplicado de placas vehiculares por deterioro, perdida o robo.',
    categoria: 'documentos',
    icono: 'id-card',
    online: true,
    requisitos: [
      'Matricula original vigente',
      'Cedula de identidad del propietario',
      'Denuncia policial (en caso de robo)',
      'Fotos de las placas deterioradas (en caso de deterioro)',
      'Formulario de solicitud'
    ],
    costoAproximado: '$35.00 - $50.00',
    tiempoEstimado: '5-8 dias habiles',
    pasos: [
      {
        titulo: 'Informacion del vehiculo',
        campos: [
          { nombre: 'placa', tipo: 'text', label: 'Numero de placa', required: true },
          { nombre: 'matriculaNumero', tipo: 'text', label: 'Numero de matricula', required: true }
        ]
      },
      {
        titulo: 'Motivo y documentos',
        campos: [
          { nombre: 'motivo', tipo: 'select', label: 'Motivo de la solicitud', required: true, opciones: ['Deterioro', 'Perdida', 'Robo'] },
          { nombre: 'docDenuncia', tipo: 'file', label: 'Denuncia policial o fotos', required: true },
          { nombre: 'docCedula', tipo: 'file', label: 'Cedula de identidad', required: true }
        ]
      },
      {
        titulo: 'Pago',
        campos: [
          { nombre: 'metodoPago', tipo: 'select', label: 'Metodo de pago', required: true, opciones: ['Transferencia bancaria', 'Deposito bancario'] },
          { nombre: 'referenciaPago', tipo: 'text', label: 'Numero de referencia/comprobante', required: true }
        ]
      },
      {
        titulo: 'Confirmacion',
        campos: []
      }
    ]
  },
  {
    id: 4,
    slug: 'transferencia-dominio',
    nombre: 'Transferencia de Dominio',
    descripcion: 'Cambio de propietario del vehiculo mediante traspaso legal notariado.',
    categoria: 'matriculacion',
    icono: 'edit',
    online: true,
    requisitos: [
      'Matricula original vigente',
      'Cedula de identidad del vendedor (original y copia)',
      'Cedula de identidad del comprador (original y copia)',
      'Carta de compra-venta notariada',
      'Certificado de gravamenes actualizado',
      'Revision tecnica vehicular vigente',
      'No tener multas pendientes'
    ],
    costoAproximado: '$55.00 - $130.00',
    tiempoEstimado: '5-10 dias habiles',
    pasos: [
      {
        titulo: 'Datos del vendedor y comprador',
        campos: [
          { nombre: 'cedulaVendedor', tipo: 'text', label: 'Cedula del vendedor', required: true },
          { nombre: 'nombreVendedor', tipo: 'text', label: 'Nombre completo del vendedor', required: true },
          { nombre: 'cedulaComprador', tipo: 'text', label: 'Cedula del comprador', required: true },
          { nombre: 'nombreComprador', tipo: 'text', label: 'Nombre completo del comprador', required: true }
        ]
      },
      {
        titulo: 'Carga de documentos',
        campos: [
          { nombre: 'docMatricula', tipo: 'file', label: 'Matricula original', required: true },
          { nombre: 'docCedulaVendedor', tipo: 'file', label: 'Cedula del vendedor', required: true },
          { nombre: 'docCedulaComprador', tipo: 'file', label: 'Cedula del comprador', required: true },
          { nombre: 'docCartaNotariada', tipo: 'file', label: 'Carta de compra-venta notariada', required: true },
          { nombre: 'docGravamenes', tipo: 'file', label: 'Certificado de gravamenes', required: true }
        ]
      },
      {
        titulo: 'Verificacion de datos',
        campos: []
      },
      {
        titulo: 'Pago',
        campos: [
          { nombre: 'metodoPago', tipo: 'select', label: 'Metodo de pago', required: true, opciones: ['Transferencia bancaria', 'Deposito bancario'] },
          { nombre: 'referenciaPago', tipo: 'text', label: 'Numero de referencia/comprobante', required: true }
        ]
      },
      {
        titulo: 'Confirmacion',
        campos: []
      }
    ]
  },
  {
    id: 5,
    slug: 'cambio-caracteristicas',
    nombre: 'Cambio de Caracteristicas',
    descripcion: 'Actualizacion de las caracteristicas del vehiculo (color, motor, carroceria) en el registro.',
    categoria: 'actualizacion',
    icono: 'wrench',
    online: false,
    requisitos: [
      'Matricula original vigente',
      'Cedula de identidad del propietario',
      'Factura de los cambios realizados',
      'Informe de revision tecnica post-cambio',
      'Fotografias del vehiculo modificado'
    ],
    costoAproximado: '$30.00 - $45.00',
    tiempoEstimado: '5-10 dias habiles (requiere cita presencial en Daule)'
  },
  {
    id: 6,
    slug: 'bloqueo-vehicular',
    nombre: 'Bloqueo Vehicular',
    descripcion: 'Registro de bloqueo vehicular por prenda, orden judicial u otras restricciones legales.',
    categoria: 'documentos',
    icono: 'lock',
    online: false,
    requisitos: [
      'Contrato de prenda industrial (si aplica)',
      'Orden judicial (si aplica)',
      'Cedula de identidad del solicitante',
      'Matricula del vehiculo',
      'Documentos legales de soporte'
    ],
    costoAproximado: '$15.00 - $25.00',
    tiempoEstimado: '3-5 dias habiles'
  },
  {
    id: 7,
    slug: 'desbloqueo-vehicular',
    nombre: 'Desbloqueo Vehicular',
    descripcion: 'Levantamiento de bloqueo vehicular con la documentacion de soporte correspondiente.',
    categoria: 'documentos',
    icono: 'unlock',
    online: false,
    requisitos: [
      'Documento de levantamiento de prenda o resolucion judicial',
      'Cedula de identidad del propietario',
      'Matricula del vehiculo',
      'Certificado de gravamenes actualizado'
    ],
    costoAproximado: '$15.00 - $25.00',
    tiempoEstimado: '3-5 dias habiles'
  },
  {
    id: 8,
    slug: 'certificado-matriculacion',
    nombre: 'Certificado de Matriculacion',
    descripcion: 'Emision de certificados de matriculacion, estado vehicular y demas documentos oficiales.',
    categoria: 'documentos',
    icono: 'document',
    online: false,
    requisitos: [
      'Cedula de identidad del solicitante',
      'Numero de placa o matricula del vehiculo',
      'Formulario de solicitud'
    ],
    costoAproximado: '$8.00 - $15.00',
    tiempoEstimado: '1-3 dias habiles'
  },
  {
    id: 9,
    slug: 'duplicado-matricula',
    nombre: 'Duplicado de Matricula',
    descripcion: 'Solicitud de duplicado del documento de matricula por deterioro, perdida o robo.',
    categoria: 'documentos',
    icono: 'clipboard',
    online: false,
    requisitos: [
      'Cedula de identidad del propietario',
      'Denuncia policial (en caso de robo o perdida)',
      'Copia de la matricula anterior (si la tiene)',
      'Formulario de solicitud'
    ],
    costoAproximado: '$25.00 - $35.00',
    tiempoEstimado: '5-8 dias habiles'
  },
  {
    id: 10,
    slug: 'cambio-servicio',
    nombre: 'Cambio de Servicio',
    descripcion: 'Cambio de tipo de servicio del vehiculo (particular a comercial o viceversa).',
    categoria: 'actualizacion',
    icono: 'swap',
    online: false,
    requisitos: [
      'Matricula original vigente',
      'Cedula de identidad del propietario',
      'Permiso de operacion (si aplica)',
      'Revision tecnica vehicular',
      'Entrega de placas anteriores'
    ],
    costoAproximado: '$45.00 - $80.00',
    tiempoEstimado: '8-15 dias habiles (requiere entrega presencial de placas)'
  },
  {
    id: 11,
    slug: 'actualizacion-domicilio',
    nombre: 'Actualizacion de Domicilio',
    descripcion: 'Actualizacion de la direccion domiciliaria del propietario en el registro vehicular.',
    categoria: 'actualizacion',
    icono: 'home',
    online: false,
    requisitos: [
      'Cedula de identidad del propietario',
      'Planilla de servicio basico (agua, luz o telefono) del nuevo domicilio',
      'Matricula del vehiculo'
    ],
    costoAproximado: '$5.00 - $10.00',
    tiempoEstimado: '1-3 dias habiles'
  },
  {
    id: 12,
    slug: 'actualizacion-datos-persona',
    nombre: 'Actualizacion de Datos Personales',
    descripcion: 'Actualizacion de datos personales del propietario (nombre, estado civil, etc.).',
    categoria: 'actualizacion',
    icono: 'user',
    online: false,
    requisitos: [
      'Cedula de identidad actualizada',
      'Certificado de votacion vigente',
      'Documento que respalde el cambio (acta de matrimonio, etc.)'
    ],
    costoAproximado: '$5.00 - $10.00',
    tiempoEstimado: '1-3 dias habiles'
  },
  {
    id: 13,
    slug: 'actualizacion-datos-vehiculo',
    nombre: 'Actualizacion de Datos del Vehiculo',
    descripcion: 'Correccion o actualizacion de datos del vehiculo en el sistema de registro vehicular.',
    categoria: 'actualizacion',
    icono: 'truck',
    online: false,
    requisitos: [
      'Matricula original vigente',
      'Cedula de identidad del propietario',
      'Revision tecnica vehicular',
      'Documentos que respalden la correccion'
    ],
    costoAproximado: '$10.00 - $20.00',
    tiempoEstimado: '3-5 dias habiles'
  }
];
