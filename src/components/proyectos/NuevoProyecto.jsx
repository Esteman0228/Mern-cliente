import React,{Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

export default function NuevoProyecto() {


    //obtener state de formulario
    const proyectoscontext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, validarFormulario} = proyectoscontext;


    //state del proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    })
    //extraer proyecto
    const {nombre} = proyecto;

    //Guardar lo que escribe el usuario
    const onChange = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario envía un proyecto
    const onSubmit = e =>{
        e.preventDefault();

        //Validar campo vacío
        if(nombre === '') {
            validarFormulario();
            return;
        }

        //Guardar Proyecto
        agregarProyecto(proyecto);

        //Reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }



    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-ptimario"
                onClick= {() => mostrarFormulario()}
            >Nuevo Proyecto
            </button>

            { formulario
                ? (<form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmit}
                        >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChange}
                        />

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>)
                : null
            }
            {errorformulario ? <p className="mensaje error">Nombre de proyecto es obligatorio</p>  : null}
        </Fragment>
    )
}
