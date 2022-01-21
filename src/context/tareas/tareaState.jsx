import React,{useReducer} from 'react';
import TareaReducer from './tareaReducer';
import TareaContext from './tareaContext'
import clienteAxios from '../../config/axios'
import {
    OBTENER_TAREAS,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREAS
} from '../../types'

const TareaState = props =>{

    const initialState = {
        tareasproyecto: [],
        error: false,
        tareaseleccionada: null
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Obtener tareas por id
    const obtenerTareas =async proyecto =>{
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}}) 
            console.log(resultado)
            dispatch({
                type: OBTENER_TAREAS,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar tareas al state
    const agregarTareas = async tarea =>{
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREAS,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    //valida el campo de tarea y muestra un error
    const validarTarea = () =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //eliminar tarea
    const eliminarTarea = async (id, proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }


    //guardar la tarea seleccionada
    const tareaActual = tarea =>{
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea =async tarea =>{
        console.log(tarea)
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type:ACTUALIZAR_TAREAS,
                payload: resultado.data.tareaExistente
            })
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <TareaContext.Provider
            value={{
                //States
                tareasproyecto: state.tareasproyecto,
                error: state.error,
                tareaseleccionada: state.tareaseleccionada,
                //Funciones
                obtenerTareas,
                agregarTareas,
                validarTarea,
                eliminarTarea,
                tareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
