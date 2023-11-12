import {useResponsivePageContext} from "../ResponsivePage/context";
import { ResponsivePage } from "../ResponsivePage";
import { useCatalogs } from "../../hooks/catalog/useCatalogs";
import Link from "next/link";

export const TotalConferencia = () => {
    const { user } = useResponsivePageContext();
    const { catalogs } = useCatalogs();
    let totalConferencia = 0;
    if (user?.escuela == "Ingeniería Informática"){
        totalConferencia = 40;
    }
    let conferenciaAsistio = 0;
    catalogs.forEach(catalog => {
        catalog.inscripciones.forEach(inscripcion => {
            if(inscripcion.codigo == user?.codigo) {
                if(inscripcion.asistencia == "Sí")
                    conferenciaAsistio++;
            }
        });
    });
    const progressBarStyles = {
      '--value': conferenciaAsistio  * 100 / totalConferencia
    };
    return(
            <div className="seccion-mis-conferencias excepcion">
                    <div role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="40" style={progressBarStyles}>
                        <img className="img-excepcion" src="\icon-total-conferencias.png" alt="conferencias" />
                    </div>
                    <h1>{conferenciaAsistio}</h1>
                    <h2>Total Conferencias</h2>
                    <Link href="/proximas-conferencias">Inscribirse</Link>
            </div>
    );
}
