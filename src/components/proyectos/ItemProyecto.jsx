import React,{useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


export default function ItemProyecto({proyecto}) {

    //obtener state de proyectos
    const proyetosContext = useContext(proyectoContext);
    const {seleccionarProyecto} = proyetosContext;
    //obtener state de tareas
    const  tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext

    //seleccionar proyecto
    const clickProyecto = id =>{
        seleccionarProyecto(id)
        obtenerTareas(id)
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>clickProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    )
}
