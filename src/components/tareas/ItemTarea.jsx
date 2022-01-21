import React, {useContext} from 'react'
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';


export default function ItemTarea({tarea}) {

    //obtener state de proyectos
    const proyectoscontext = useContext(proyectoContext);
    const {proyectoactual} = proyectoscontext;

    const [proyecto] = proyectoactual;

    //obtener state de tareas
    const  tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, tareaActual} = tareasContext

    const onClick = (id) =>{
        eliminarTarea(id, proyecto._id);
        obtenerTareas(proyecto.id);
    }

    //actualiza el estado de la tarea
    const modificarTarea = tarea =>{
        if(tarea.estado === true){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        console.log(tarea.estado)
        actualizarTarea(tarea);
    }

    //Selecciona la tarea para su edición
    const editarTarea = tarea =>{
        tareaActual(tarea)
    }

    return (
        <div>
            <li className="tarea sombra">
                <p>{tarea.nombre}</p>

                <div className="estado">
                    {tarea.estado
                    ?(<button
                        type="button"
                        className="completo"
                        onClick={()=>modificarTarea(tarea)}
                    >
                        Completo</button>)
                    :(<button
                        type="button"
                        className="incompleto"
                        onClick={()=>modificarTarea(tarea)}
                    >
                        Incompleto</button>)
                    }
                </div>

                <div className="acciones">
                    <button
                        type="button"
                        className="btn btn-primario"
                        onClick={()=>editarTarea(tarea)}
                    >Editar</button>
                    <button
                        type="button"
                        className="btn btn-primario"
                        onClick={()=>onClick(tarea._id)}
                    >Eliminar</button>
                </div>
            </li>
        </div>
    )
}
