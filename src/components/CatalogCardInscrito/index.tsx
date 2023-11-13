import { Card } from "react-bootstrap";
import { Catalog } from "../../types/Catalog";
import { User } from "../../types/User";
import ModalInscribir from "../BotonModal";
import ModalMaterial from "../BotonMaterial";
import { useResponsivePageContext } from "../ResponsivePage/context";
import axios from "axios";
import { Convalida } from "../../types/Convalida";
import { useEffect, useState } from "react";

export const CatalogCardInscrito = ({ catalog }: { catalog: Catalog }) => {
  const { user } = useResponsivePageContext();
  const [fotoUrl, setFotoUrl] = useState("");

  let color = '';

  const fecha = new Date();
  const fechaConferencia = new Date(catalog.fecha);
  fechaConferencia.setDate(fechaConferencia.getDate() + 1);

  catalog.inscripciones.forEach(inscripcion => {
    if(inscripcion.codigo == user?.codigo){
        if(inscripcion.asistencia == "Sí"){
          color = "#B4E5A4";
        }
        else{
          if(fechaConferencia > fecha){
            color = "#EDEDED"
          }
          else{
            color = "#E56E5A";
          }
        }
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiFoto = await axios.get(`http://localhost:1338/api/catologos/${catalog.id}?populate=foto`);
        const url = apiFoto.data.data.attributes.foto.data.attributes.url;
        setFotoUrl(`http://localhost:1338${url}`);
      } catch (error) {
        console.error("Error al obtener la foto:", error);
      }
    };

    fetchData();
  }, [catalog.id]);


const character__body = {
  "background-color" : color,
  "color" : "#000"
}
  
  return (
    <Card style={character__body} key={`catalog-${catalog.id}`}>
    <div className="cont-img">
      <Card.Img
        variant="top"
        src={fotoUrl}
      />
    </div>

    <Card.Body className="card-body-inscrito" style={character__body}>
      <Card.Title style={character__body}>{catalog.tema_conferencia}</Card.Title>
      <p className="nombre-expositor" style={character__body}>Dirigido por: {catalog.expositor}</p>
      <div className="card-inscrito" style={character__body}>
        <div className="card-inscrito-seccion-texto">
          <p className="card-inscrito-texto" style={character__body}>
            <img src="\calendario-icon-black.svg" alt="fecha" />
            {catalog.fecha} -{" "}
            {catalog.hora === null ? "" : catalog.hora.slice(0, 5)}
          </p>

          <p className="card-inscrito-texto" style={character__body}>
            <img src="\salon-icon-black.svg" alt="salon" />
            {catalog?.salon.data.attributes.nombre}
          </p>
        </div>
        <div className="card-inscrito-seccion-boton" style={character__body}>
          {catalog.repositorio ? (
            <a href={catalog.repositorio} target="_blank">VER MATERIAL</a>
          ) : (
            <span>MATERIAL NO DISPONIBLE</span>
          )}
        </div>
      </div>
    </Card.Body>
  </Card>
    
  );
};
