import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import jsPDF from 'jspdf'; // Importa jspdf para generar PDFs
import './App.css';

const alumnos = [
  { id: '00738028', nombre: 'Suastegui Hernández Dulce Lisbeth', carrera: 'LIC-ADME-18' },
  { id: '00662244', nombre: 'Tabarez Guillén Jaylin Esmeralda', carrera: 'LIC-ADME-18' },
  // ... otros estudiantes
];

const documentosOpciones = [
  { id: 'Acta Nacimiento', label: 'Acta Nacimiento' },
  { id: 'Curp', label: 'Curp' },
  { id: 'certificado Prepa', label: 'certificado Prepa' },
  { id: 'Comprobante de domicilio', label: 'Comprobante de domicilio' },
  { id: 'Comprobante de pago de inscripción', label: 'Comprobante de pago de inscripción' },
  { id: 'Fotografías', label: 'Fotografías:' },
];

const App = () => {
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(alumnos[0]);
  const [documentosSeleccionados, setDocumentosSeleccionados] = useState([]);
  const [mostrarDocumentos, setMostrarDocumentos] = useState(false); // Estado para controlar la visibilidad de la lista de documentos

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked && !documentosSeleccionados.includes(value)) {
      setDocumentosSeleccionados([...documentosSeleccionados, value]);
    } else {
      const newDocumentosSeleccionados = documentosSeleccionados.filter(doc => doc !== value);
      setDocumentosSeleccionados(newDocumentosSeleccionados);
    }
  };

  const handleNombreChange = (e) => {
    setAlumnoSeleccionado({ ...alumnoSeleccionado, nombre: e.target.value });
  };

  const handleIdChange = (e) => {
    setAlumnoSeleccionado({ ...alumnoSeleccionado, id: e.target.value });
  };

  const handleCarreraChange = (e) => {
    setAlumnoSeleccionado({ ...alumnoSeleccionado, carrera: e.target.value });
  };

  const toggleMostrarDocumentos = () => {
    setMostrarDocumentos(!mostrarDocumentos);
  };

  const generarAcusePDF = () => {
    const fecha = new Date().toISOString().split('T')[0];
    const { nombre, id, carrera } = alumnoSeleccionado;
    const documento = documentosSeleccionados.map(doc => documentosOpciones.find(opcion => opcion.id === doc).label).join(', ');

    const acuseTemplate = `
      Campus: Acapulco
      ACUSE DE RECEPCIÓN DE DOCUMENTOS
      Nombre del Estudiante: ${nombre} ID: ${id}
      Programa: ${carrera} Fecha: ${fecha}
      Se hace constar que el estudiante hace entrega de los siguientes documentos:
      - ${documento}
      * Bajo protesta de decir verdad, el estudiante manifiesta que los documentos originales entregados, son auténticos; en caso contrario, deslinda de toda
      responsabilidad a la Universidad Interamericana para el Desarrollo (UNID) y acepta que se hará acreedor a las sanciones que el Reglamento General de
      Estudiantes del Sistema UNID vigente establece, así como a las leyes correspondientes del país.
      * El estudiante se da por enterado de que la documentación original entregada, quedará bajo resguardo en la Coordinación de Servicios Escolares durante el
      tiempo que dure la carrera elegida y durante el proceso de titulación y le será regresada cuando finalicen dichos trámites.
      Firma de Alumno(a) Firma del Coordinador de Servicios Escolares
      Para el estudiante
      \n\n
      Campus: Acapulco
      ACUSE DE RECEPCIÓN DE DOCUMENTOS
      Nombre del Estudiante: ${nombre} ID: ${id}
      Programa: ${carrera} Fecha: ${fecha}
      Se hace constar que el estudiante hace entrega de los siguientes documentos:
      - ${documento}
      * Bajo protesta de decir verdad, el estudiante manifiesta que los documentos originales entregados, son auténticos; en caso contrario, deslinda de toda
      responsabilidad a la Universidad Interamericana para el Desarrollo (UNID) y acepta que se hará acreedor a las sanciones que el Reglamento General de
      Estudiantes del Sistema UNID vigente establece, así como a las leyes correspondientes del país.
      * El estudiante se da por enterado de que la documentación original entregada, quedará bajo resguardo en la Coordinación de Servicios Escolares durante el
      tiempo que dure la carrera elegida y durante el proceso de titulación y le será regresada cuando finalicen dichos trámites.
      Firma de Alumno(a) Firma del Coordinador de Servicios Escolares
      Para el Campus
    `;

    // Configuración de PDF
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(acuseTemplate, 180);
    doc.text(splitText, 10, 10);

    // Descarga del PDF
    doc.save('acuse_documento.pdf');
  };

  return (
    <div>
      <header>
        <div className="container-fluid bg-light py-3">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="ms-3 mb-0">Sistema de Acuse Documentos</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form id="formularioEntrega" className="bg-white p-4 rounded shadow-sm">
              <div className="mb-3">
                <label htmlFor="nombreAlumno" className="form-label">Nombre del Alumno:</label>
                <input 
                  type="text" 
                  id="nombreAlumno" 
                  className="form-control" 
                  value={alumnoSeleccionado.nombre} 
                  onChange={handleNombreChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="idAlumno" className="form-label">ID de 8 dígitos:</label>
                <input 
                  type="text" 
                  id="idAlumno" 
                  className="form-control" 
                  value={alumnoSeleccionado.id} 
                  onChange={handleIdChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="carreraAlumno" className="form-label">Carrera:</label>
                <input 
                  type="text" 
                  id="carreraAlumno" 
                  className="form-control" 
                  value={alumnoSeleccionado.carrera} 
                  onChange={handleCarreraChange} 
                  required 
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="documentoEntregado" className="form-label">Documentos Entregados:</label>
                <div>
                  <button type="button" className="btn btn-secondary mb-2" onClick={toggleMostrarDocumentos}>
                    {mostrarDocumentos ? 'Ocultar Documentos' : 'Mostrar Documentos'}
                  </button>
                </div>
                {mostrarDocumentos && (
                  <ul className="list-group documentos-lista">
                    {documentosOpciones.map(doc => (
                      <li key={doc.id} className="list-group-item">
                        <FormControlLabel
                          control={<Checkbox onChange={handleCheckboxChange} value={doc.id} />}
                          label={doc.label}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button type="button" className="btn btn-primary" onClick={generarAcusePDF}>GENERAR ACUSE</button>
            </form>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div id="comprobantes" className="bg-white p-4 rounded shadow-sm">
              <h2 className="mb-4">Comprobantes para coordinación académica</h2>
              <div id="comprobanteAlumno"></div>
              <div id="comprobantePersonal"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
