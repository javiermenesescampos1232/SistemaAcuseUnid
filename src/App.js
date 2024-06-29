import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaSearch } from 'react-icons/fa'; 

const alumnos = [
  { id: '00738028', nombre: 'Suastegui Hernández Dulce Lisbeth', carrera: 'LIC-ADME-18' },
  { id: '00662244', nombre: 'Tabarez Guillén Jaylin Esmeralda', carrera: 'LIC-ADME-18' },
  
];

const App = () => {
  const [documentos, setDocumentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
    const alumno = alumnos.find(a => a.id === e.target.value);
    if (alumno) {
      setAlumnoSeleccionado(alumno);
    }
  };

  const handleAddDocumento = () => {
    const documentoSeleccionado = document.getElementById('documentoEntregado').value;
    if (documentoSeleccionado && !documentos.includes(documentoSeleccionado)) {
      setDocumentos([...documentos, documentoSeleccionado]);
    }
  };

  const handleRemoveDocumento = (index) => {
    const newDocumentos = [...documentos];
    newDocumentos.splice(index, 1);
    setDocumentos(newDocumentos);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const alumno = alumnos.find(a => a.id === busqueda);
    if (alumno) {
      setAlumnoSeleccionado(alumno);
    } else {
      setAlumnoSeleccionado(null);
    }
  };

  return (
    <div>
      <header>
        <div className="container-fluid bg-light py-3">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h1 className="ms-3 mb-0">Sistema de Acuse Documentos</h1>
              </div>
              <div className="search-container">
                <FaSearch
                  className="search-icon"
                  onClick={() => setShowSearch(!showSearch)}
                  style={{ cursor: 'pointer', fontSize: '1.5em' }}
                />
                {showSearch && (
                  <form onSubmit={handleSearchSubmit} className="search-form">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="searchInput" 
                      placeholder="Buscar ID de Estudiante..." 
                      value={busqueda}
                      onChange={handleSearch} 
                    />
                    <button type="submit" className="btn btn-primary mt-2" id="searchSubmit">Buscar</button>
                  </form>
                )}
              </div>
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
                  value={alumnoSeleccionado ? alumnoSeleccionado.nombre : ''} 
                  readOnly 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="idAlumno" className="form-label">ID de 8 dígitos:</label>
                <input 
                  type="text" 
                  id="idAlumno" 
                  className="form-control" 
                  value={alumnoSeleccionado ? alumnoSeleccionado.id : ''} 
                  readOnly 
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="carreraAlumno" className="form-label">Carrera:</label>
                <input 
                  type="text" 
                  id="carreraAlumno" 
                  className="form-control" 
                  value={alumnoSeleccionado ? alumnoSeleccionado.carrera : ''} 
                  readOnly 
                  required 
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="documentoEntregado" className="form-label">Documento Entregado:</label>
                <select id="documentoEntregado" className="form-control" required>
                  <option value="" disabled selected>Selecciona un documento</option>
                  <option value="certificado_estudios">Certificado de Estudios</option>
                  <option value="boleta_calificaciones">Boleta de Calificaciones</option>
                  <option value="titulo_universitario">Título Universitario</option>
                  <option value="diploma_especialidad">Diploma de Especialidad</option>
                  <option value="constancia_inscripcion">Constancia de Inscripción</option>
                  <option value="constancia_estudios">Constancia de Estudios</option>
                  <option value="carta_buena_conducta">Carta de Buena Conducta</option>
                  <option value="kardex">Kardex</option>
                  <option value="constancia_no_adeudo">Constancia de No Adeudo</option>
                  <option value="certificado_servicio_social">Certificado de Servicio Social</option>
                  <option value="carta_pasante">Carta de Pasante</option>
                  <option value="constancia_practicas_profesionales">Constancia de Prácticas Profesionales</option>
                  <option value="constancia_actividades_complementarias">Constancia de Actividades Complementarias</option>
                  <option value="certificado_medico">Certificado Médico</option>
                  <option value="comprobante_pago_inscripcion">Comprobante de Pago de Inscripción</option>
                  <option value="comprobante_pago_colegiatura">Comprobante de Pago de Colegiatura</option>
                  <option value="carta_liberacion_servicio_social">Carta de Liberación de Servicio Social</option>
                  <option value="carta_recomendacion">Carta de Recomendación</option>
                  <option value="carta_presentacion_practicas_profesionales">Carta de Presentación para Prácticas Profesionales</option>
                  <option value="acta_examen_profesional">Acta de Examen Profesional</option>
                </select>
                <button type="button" id="addDocumento" className="btn btn-secondary mt-3" onClick={handleAddDocumento}>Agregar Documento</button>
              </div>
              <ul id="documentosSeleccionados" className="list-group mb-3">
                {documentos.map((doc, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {doc}
                    <span 
                      className="badge bg-success rounded-pill" 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => handleRemoveDocumento(index)}
                    >
                      ✔
                    </span>
                  </li>
                ))}
              </ul>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div id="comprobantes" className="bg-white p-4 rounded shadow-sm">
              <h2 className="mb-4">Comprobantes para coordinacion académica</h2>
              <div id="comprobanteAlumno"></div>
              <div id="comprobantePersonal"></div>
              <button id="generarPdf" className="btn btn-primary mt-3">DESCARGAR PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
