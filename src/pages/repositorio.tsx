import { ResponsivePage } from "../components/ResponsivePage";
import Link from "next/link";
import CatalogsRepo from "../components/CatalogsRepo";

const VerCatalogo = () => {
  return (
    <ResponsivePage>
      <div className="container mt-3 mb-4 header-mis-conferencias">
        <h2>Repositorio de conferencias</h2>
        <Link href="/mis-conferencias"><img src="\icon-forward.svg" alt="search" /></Link>
      </div>
      <div className="container senalizacion">
        <div className="senalizacion-seccion"><div className="circulo-asistio"></div><h6>Asistió</h6></div>
        <div className="senalizacion-seccion"><div className="circulo-no-asistio"></div><h6>No asistió</h6></div>
        <div className="senalizacion-seccion"><div className="circulo-pendiente"></div><h6>Pendiente</h6></div>
      </div>
      <div className="container contenedor-proximos">
        <CatalogsRepo/>
      </div>
    </ResponsivePage>
  );
};

export default VerCatalogo;