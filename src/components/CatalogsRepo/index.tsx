import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import { Catalog } from "../../types/Catalog";
import { CatalogCardInscrito } from "../CatalogCardInscrito";
import { useResponsivePageContext } from "../ResponsivePage/context";

const CatalogsRepo = () => {
    const { catalogs } = useCatalogs(); // Usar "catalogs" en lugar de "catalogsClient"
    const {user} = useResponsivePageContext();

  let conferencias: Catalog[] = [];

  catalogs.forEach(catalog => {
    let flag = false;
    catalog.inscripciones.forEach(inscripcion => {
        if(inscripcion.codigo == user?.codigo){
            flag = true;
        }
    })
    if(flag == true){
        conferencias.push(catalog);
    }
  });
  

  return (
    <>
        <div
          className="contenedor-catalogo"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 20rem), 1fr))",
            columnGap: "35px",
            rowGap: "25px",
            marginTop: "20px",
          }}
        >
          {conferencias.map((catalog) => (
            <CatalogCardInscrito key={catalog.id} catalog={catalog} /> // Usar "catalog.id" como clave
          ))}
        </div>
    </>
  )
}

export default CatalogsRepo;