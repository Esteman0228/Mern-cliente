import React,{useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FURMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';

const ProyectoState = props =>{
    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyectoactual:null,
        mensaje: null
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FURMULARIO_PROYECTO
        })
    }
    
    //Obtener los proyectos de la db
    const obtenerProyectos = async() =>{
        const resultado = await clienteAxios.get('/api/proyectos')
        try {
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    
    //Agregar un proyecto a la lista de proyectos
    const agregarProyecto = async proyecto =>{
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
            //Guarda el proyecto en la lista
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Validar campo del formulario
    const validarFormulario= () =>{
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }

    //selecciona el proyecto
    const seleccionarProyecto = proyectoID =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoID
        })
    }

    //Eliminar proyectos
    const eliminarProyecto = async proyectoID =>{
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoID}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoID
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria:'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    return(
        <proyectoContext.Provider
            value={{
                //States
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyectoactual: state.proyectoactual,
                mensaje: state.mensaje,
                //Funciones
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                validarFormulario,
                seleccionarProyecto,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState