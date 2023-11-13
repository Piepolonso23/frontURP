import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Catalog } from "../../types/Catalog";
import { useCatalog } from "../../hooks/catalog/useCatalog";
import ModalQR from '../ModalQR';
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useResponsivePageContext} from "../ResponsivePage/context";
import { useCatalogs } from '../../hooks/catalog/useCatalogs';
import { useUsers } from '../../hooks/user/useUsers';
import { url } from 'inspector';

function formatearFecha(fechaOriginal) {
    const fecha = new Date(fechaOriginal);
    fecha.setDate(fecha.getDate() + 1);
    const dia = fecha.getDate();
    const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
    const anio = fecha.getFullYear();
  
    return `${dia} de ${mes}`;
  }

const ModalInscribir = ({ estado, cambiarEstado, catalogo, setCatalogo}) => {
    const { user } = useResponsivePageContext();
    const { updateUser} = useUsers();
    const { register, handleSubmit, formState: { errors } } = useForm<Catalog>();
  
    const { updateCatalog } = useCatalog(); // Asegúrate de importar la función updateCatalog correctamente.
  
    const { catalogs, myCatalog } = useCatalogs();

    const [estadoModal, cambiarEstadoModal] = useState(false);

    //al darle click al boton
    const handleOnSubmit = async (data: any) => {

    //pone el miconf de la conferencia en true
      const handleMyCatalog = async (catalogId: string) => {
        await myCatalog(catalogId);
     };

      const nuevoAlumno = {
        nombre: user?.nombre,
        apellido: user?.apellido,
        codigo: user?.codigo,
        carrera: user?.escuela,
        asistencia: "No"
      };
      // Obtén la lista de objetos actual del campo JSON
      const listaDeAlumnos = catalogo.inscripciones;

        if(listaDeAlumnos.length == 0){
          listaDeAlumnos.push(nuevoAlumno);
        }
        else{
          listaDeAlumnos.forEach(alumno => {
            if(alumno.codigo != nuevoAlumno.codigo) {
              listaDeAlumnos.push(nuevoAlumno);
            }
            else{
              console.log("El alumno ya se inscrbio")
            }
          });
        }
        
  
      // Actualiza el campo JSON del catálogo con la lista actualizada
      const updatedCatalog = {
        ...catalogo,
        inscripciones: listaDeAlumnos,
      };
  
      // Llama a la función updateCatalog para actualizar el catálogo con la nueva lista de objetos.
      const response = await updateCatalog(catalogo.id, updatedCatalog);

  
      if (response) {
        console.log("Nuevo alumno registrado con éxito:", response);
        // Realiza cualquier otra acción necesaria después de la actualización.
      } else {
        console.error("Error al registrar al nuevo alumno.");
      }
      cambiarEstadoModal(!estadoModal);
    };

    const fechaFormateada = formatearFecha(Date.parse(catalogo?.fecha));
  return (
    <>
            {estado && (
                <div className="overlay">
                <div className="contenido-modal">
                  <div className="encabezado-modal">
                    <h3>INSCRÍBETE AHORA</h3>
                  </div>
                  <button
                    className="boton-cerrar"
                    onClick={() => cambiarEstado(false)}
                  >
                    <img src="\close-solid.svg" alt="close" />
                  </button>
                  <div className="contenido">
                    <div className="seccion">
                      <h5>Conferencia: </h5>
                      <p>{catalogo.tema_conferencia}</p>
                    </div>
                    <div className="seccion">
                      <h5>Fecha y hora: </h5>
                      <p>{fechaFormateada === null ? "No establecida" : fechaFormateada} - {catalogo.hora === null ? "No establecida" : catalogo.hora.slice(0, 5)}</p>
                    </div>
                    <div className="seccion">
                      <h5>Salón: </h5>
                      <p>{catalogo.salon.data.attributes.nombre === null ? "No establecido" : catalogo.salon.data.attributes.nombre}</p>
                    </div>
                    <div className="seccion">
                      <h5>Dirigido a: </h5>
                      <p>{catalogo.dirigido === null ? "No establecido" : catalogo.dirigido}</p>
                    </div>
                    <div className="seccion-titulo-alumno">
                        <h3>Información del alumno</h3>
                    </div>
                    <div className="seccion">
                      <h5>Código: </h5>
                      <p>{user?.codigo}</p>
                    </div>
                    <div className="seccion">
                      <h5>Escuela: </h5>
                      <p>{user?.escuela}</p>
                    </div>
                    <div className="seccion">
                      <h5>Nombres: </h5>
                      <p>{user?.nombre}</p>
                    </div>
                    <div className="seccion">
                      <h5>Apellidos: </h5>
                      <p>{user?.apellido}</p>
                    </div>
                    <div className="seccion-botones">
                      <div className="botones-modal">
                        <button className="inscribirme-ahora" onClick={handleSubmit(handleOnSubmit)} >INSCRIBIRME AHORA</button>
                      </div>
                      <ModalQR
                      estado={estadoModal}
                      cambiarEstado={cambiarEstadoModal}/>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </>
  )
};
export default ModalInscribir;