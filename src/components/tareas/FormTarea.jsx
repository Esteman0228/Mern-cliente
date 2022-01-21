import React,{useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export default function FormTarea() {

    //obtener state de proyectos
    const proyectoscontext = useContext(proyectoContext);
    const {proyectoactual} = proyectoscontext;

    //obtener state de tareas
    const  tareasContext = useContext(tareaContext);
    const {tareaseleccionada, error, obtenerTareas, agregarTareas, validarTarea, actualizarTarea} = tareasContext

    //Effect de tareas seleccionadas
    useEffect(()=>{
        if(tareaseleccionada !== null){
            setTarea(tareaseleccionada)
        }else{
            setTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])


    //State para leer el formulario
    const [tarea, setTarea] = useState({
        nombre:''
    })

    const handdleTarea = e =>{
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }
    

    //Condición para cuando no hayan proyectos seleccionados
    if(!proyectoactual) return null;

    //Array distructuring para obtener proyetos del array
    const [proyecto] = proyectoactual;

    //Agregar tarea al state de tareas
    const onSubmit = e =>{
        e.preventDefault()

        //Validar campo vacío 
        if (tarea.nombre.trim() === ''){
            validarTarea();
            return;
        }

        //si es edicición o si es nueva tarea
        if (tareaseleccionada===null){
            //agregar tarea
            tarea.proyecto = proyecto._id
            agregarTareas(tarea)
        } else {
            actualizarTarea(tarea)
        }

        //Obtener y filtrar tareas del proyecto
        obtenerTareas(proyecto._id)

        //reiniciar el formulario
        setTarea({nombre:''})
    }


    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={tarea.nombre}
                        onChange={handdleTarea}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
                {error ? <p className='error mensaje'>El nombre es obligatorio</p> :null}
            </form>
        </div>
    )
}
