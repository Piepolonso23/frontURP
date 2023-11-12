import { ResponsivePage } from "../components/ResponsivePage";
import { useResponsivePageContext } from "../components/ResponsivePage/context";
import { useCatalogs } from "../hooks/catalog/useCatalogs";
import { TotalConferencia } from "../components/TotalConferencia";
import Link from "next/link";
import { CatalogCard } from "../components/CatalogCard";
import { User } from "../types/User";
import { Catalog } from "../types/Catalog";
import ModalInscribir from "../components/BotonModal";
import { useState } from "react";
import ProximasConfes from "../components/ProximasConfes";

function formatearFecha(fechaOriginal) {
  const fecha = new Date(fechaOriginal);
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString("es-ES", { month: "long" });
  const anio = fecha.getFullYear();

  return `${dia} de ${mes}`;
}

const VerCatalogo = ({ catalog }: { catalog: Catalog }) => {
  const { catalogs } = useCatalogs();
  function encontrarConferenciaMasTemprana(pc) {
    if (pc.length === 0) {
      return null; // Si el array está vacío, no hay conferencias.
    }

    let conferenciaMasTemprana = pc[0]; // Suponemos que la primera conferencia es la más temprana.

    for (let i = 1; i < pc.length; i++) {
      const fechaConferencia = new Date(pc[i].fecha);
      const fechaMasTemprana = new Date(pc.fecha);

      if (fechaConferencia < fechaMasTemprana) {
        conferenciaMasTemprana = pc[i];
      }
    }

    return conferenciaMasTemprana;
  }

  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [catalogElement, setCatalogElement] = useState<Catalog>();

  const proximasConferencias = catalogs.filter((catalog) => (!catalog.miconf) && catalog.disponible);
  const cmt = encontrarConferenciaMasTemprana(proximasConferencias);
  const fechaFormateada = formatearFecha(Date.parse(cmt?.fecha));
  return (
    <ResponsivePage>
      <div className="container mt-3 mb-4 header-mis-conferencias">
        <h2>Mis conferencias</h2>
        <img src="\icon -search.svg" alt="search" />
      </div>

      <div className="container contenido-mis-conferencias">
        <TotalConferencia />
        <ProximasConfes/>
        <div className="seccion-mis-conferencias">
          <img src="\icon-convalida-conferencia.png" alt="conferencias" />
          <h2>Convalida tus conferencia</h2>
          <Link href="/convalida-conferencia">Convalida conferencia</Link>
        </div>
        <div className="seccion-mis-conferencias">
          <img src="\icon-repositorio.png" alt="conferencias" />
          <h2>Repositorio de conferencias</h2>
          <Link href="/repositorio">Mostrar</Link>
        </div>
      </div>
    </ResponsivePage>
  );
};
<script src="sweetalert2.min.js"></script>;
<link rel="stylesheet" href="sweetalert2.min.css"></link>;
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>;

export default VerCatalogo;
