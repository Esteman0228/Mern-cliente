import React,{Fragment, useContext} from 'react';
import ItemTarea from './ItemTarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


export default function ListadoTarea() {

    //obtener state de formulario
    const proyectoscontext = useContext(proyectoContext);
    const {proyectoactual, eliminarProyecto} = proyectoscontext;

    //obtener state de tareas
    const  tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext

    //Condición para cuando no hayan proyectos seleccionados
    if(!proyectoactual) return <h2>Seleccione un proyecto</h2>;

    //Array distructuring para obtener proyetos del array
    const [proyecto] = proyectoactual;

    return (
        <Fragment>
            <h2>Proyecto: {proyecto.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                ?(<li className="tarea"><p>No hay tareas</p></li>)
                :tareasproyecto.map(tarea =>(
                    <ItemTarea
                        key={tarea._id}
                        tarea={tarea}
                    />
                ))}
            </ul>
            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={()=>eliminarProyecto(proyecto._id)}
            >
                Eliminar proyecto &times;
            </button>
        </Fragment>
    )
}
