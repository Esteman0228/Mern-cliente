import React, {useContext, useEffect} from 'react';
import ItemProyecto from './ItemProyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
;


export default function ListadoProyectos() {

    //Extraer proyectos del state inicial
    const proyectosContext =  useContext(proyectoContext);
    const {proyectos, mensaje, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //obtener proyectos con effect
    useEffect(()=>{

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        //eslint-disable-next-line
    },[mensaje]);

    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            {alerta ?<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
            {proyectos.map(proyecto =>(
                <ItemProyecto
                    key = {proyecto._id}
                    proyecto = {proyecto}
                />
            ))}
        </ul>
    )
}
