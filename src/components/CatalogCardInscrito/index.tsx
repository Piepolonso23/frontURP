import { Card } from "react-bootstrap";
import { Catalog } from "../../types/Catalog";
import { User } from "../../types/User";
import ModalInscribir from "../BotonModal";
import ModalMaterial from "../BotonMaterial";
import { useResponsivePageContext } from "../ResponsivePage/context";

export const CatalogCardInscrito = ({ catalog }: { catalog: Catalog }) => {
  const { user } = useResponsivePageContext();

  let color = '';

  const fecha = new Date();
  console.log(fecha);
  const fechaConferencia = new Date(catalog.fecha);
  console.log(fechaConferencia);

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

const character__body = {
  "background-color" : color,
  "color" : "#000"
}
  
  return (
    <Card style={character__body} key={`catalog-${catalog.id}`}>
    <div className="cont-img">
      <Card.Img
        variant="top"
        src="http://localhost:1338/uploads/mobile_app_design_fundamentals_the_difference_between_UI_and_UX_9227cad9aa.webp"
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
            {catalog.salon}
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
