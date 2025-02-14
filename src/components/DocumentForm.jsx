import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';  
import FormControlLabel from '@mui/material/FormControlLabel'; 
import jsPDF from 'jspdf';
import logo from '../img/descarga.png';

const DocumentForm = () => {
  const alumnos = [
    { id: '00738028', nombre: 'Suastegui Hernández Dulce Lisbeth', carrera: 'LIC-ADME-18' },
    { id: '00662244', nombre: 'Tabarez Guillén Jaylin Esmeralda', carrera: 'LIC-ADME-18' },
  ];

  const documentosOpciones = [
    { id: 'ACTA NACIMIENTO', label: 'ACTA NACIMIENTO' },
    { id: 'CURP', label: 'CURP' },
    { id: 'CERTIFICADO PREPA', label: 'CERTIFICADO PREPA' },
    { id: 'COMPROBANTE DOMICILIO', label: 'COMPROBANTE DOMICILIO' },
    { id: 'COMPROBANTE INSCRIPCION', label: 'COMPROBANTE INSCRIPCION' },
    { id: 'FOTOGRAFIAS', label: 'FOTOGRAFIAS' },
  ];

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(alumnos[0]);
  const [documentosSeleccionados, setDocumentosSeleccionados] = useState([]);
  const [mostrarDocumentos, setMostrarDocumentos] = useState(false);

  const carrerasOpciones = [
    'ADMINISTRACION DE EMPRESAS',
    'COMUNICACION',
    'DISEÑO GRAFICO DIGITAL',
    'INGENIERIA DE SOFTWARE Y SISTEMAS COMPUTACIONALES',
    'DERECHOS Y CIENCIAS JURIDICAS'
  ];

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

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  const generarAcusePDF = () => {
    const fecha = new Date().toISOString().split('T')[0];
    const { nombre, id, carrera } = alumnoSeleccionado;
    const documentosEnLista = documentosSeleccionados.map(doc => documentosOpciones.find(opcion => opcion.id === doc).label);

    const acuseTemplate = `
      Campus: Acapulco
      ACUSE DE RECEPCIÓN DE DOCUMENTOS
      Nombre del Estudiante: ${nombre} ID: ${id}
      Programa: ${carrera}
      
      Se hace constar que el estudiante hace entrega de los siguientes documentos:
      ${documentosEnLista.map(doc => `- ${doc}`).join('\n')}
      
      * Bajo protesta de decir verdad, el estudiante manifiesta que los documentos originales entregados, son auténticos; en caso contrario, deslinda de toda
      responsabilidad a la Universidad Interamericana para el Desarrollo (UNID) y acepta que se hará acreedor a las sanciones que el Reglamento General de
      Estudiantes del Sistema UNID vigente establece, así como a las leyes correspondientes del país.
      * El estudiante se da por enterado de que la documentación original entregada, quedará bajo resguardo en la Coordinación de Servicios Escolares durante el
      tiempo que dure la carrera elegida y durante el proceso de titulación y le será regresada cuando finalicen dichos trámites.
    `;

    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(acuseTemplate, 180);

    const imgData = logo;
    doc.addImage(imgData, 'PNG', 10, 10, 50, 20);

    doc.setFontSize(10);
    doc.setFont('times');
    doc.setTextColor(0, 0, 0);

    doc.text(fecha, 200, 10, { align: 'right' });

    splitText.forEach((line, index) => {
      doc.text(line, 10, 40 + (index * 5), { align: 'justify' });
    });

    doc.text('Firma de Alumno(a):', 10, 200);
    doc.text('___________________________', 10, 210);
    doc.text('Firma del Coordinador de Servicios Escolares:', 100, 200);
    doc.text('___________________________', 100, 210);

    doc.save('acuse_documento.pdf');
  };

  return (
    <div>
      <header>
        <div className="container-fluid bg-light py-3">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="ms-3 mb-0">Sistema de Acuse Documentos</h1>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
              </button>
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
                <select 
                  id="carreraAlumno" 
                  className="form-control" 
                  value={alumnoSeleccionado.carrera} 
                  onChange={handleCarreraChange}
                  required
                >
                  <option value="">Seleccione una carrera</option>
                  {carrerasOpciones.map((carrera, index) => (
                    <option key={index} value={carrera}>{carrera}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="documentoEntregado" className="form-label">Documentos Entregados:</label>
                <div>
                  <button type="button" className="btn btn-primary mb-3" onClick={toggleMostrarDocumentos}>
                    {mostrarDocumentos ? 'Ocultar Documentos' : 'Mostrar Documentos'}
                  </button>
                  {mostrarDocumentos && (
                    <div>
                      {documentosOpciones.map((opcion) => (
                        <div key={opcion.id} className="form-check">
                          <FormControlLabel
                            control={<Checkbox />}
                            label={opcion.label}
                            value={opcion.id}
                            checked={documentosSeleccionados.includes(opcion.id)}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-success" onClick={generarAcusePDF}>
                  Generar Acuse de Recibo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
