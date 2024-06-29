import React, { useState } from 'react';
import jsPDF from 'jspdf';

const VerificationForm = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [carrera, setCarrera] = useState('');
  const [documento, setDocumento] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const fecha = new Date().toISOString().split('T')[0];
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
    
    ✂------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

    document.getElementById('comprobanteAlumno').textContent = acuseTemplate;
    document.getElementById('comprobantePersonal').textContent = acuseTemplate;
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();

    const alumnoComprobante = document.getElementById('comprobanteAlumno').textContent.split('\n');
    const personalComprobante = document.getElementById('comprobantePersonal').textContent.split('\n');

    const lineHeight = 10;
    const leftMargin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    alumnoComprobante.forEach((line, index) => {
      if (index === 0 || index === 1 || index === 11 || index === 12) {
        doc.text(line.trim(), centerX, 10 + (index * lineHeight), { align: 'center' });
      } else {
        doc.text(line.trim(), leftMargin, 10 + (index * lineHeight));
      }
    });

    doc.text('✂------------------------------------------------------------------------------------------------------------------------------------------------------------------------------', centerX, 140, { align: 'center' });

    personalComprobante.forEach((line, index) => {
      if (index === 0 || index === 1 || index === 11 || index === 12) {
        doc.text(line.trim(), centerX, 150 + (index * lineHeight), { align: 'center' });
      } else {
        doc.text(line.trim(), leftMargin, 150 + (index * lineHeight));
      }
    });

    const pdfName = 'acuse_de_recibo.pdf';
    doc.save(pdfName);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.src = doc.output('bloburl');
    iframe.onload = function() {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    };
  };
}

export default VerificationForm;
