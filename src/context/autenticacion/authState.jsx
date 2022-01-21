import React,{useReducer} from 'react';
import autContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje:null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registroUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
            //obtener el usuario autenticado
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const iniciarSesion = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data 
            });
            //obtener el usuario autenticado
            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () =>{
        dispatch({
            type:CERRAR_SESION
        })
    }

    return(
        <autContext.Provider
            value={{
                //states
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                //funciones
                registroUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </autContext.Provider>
    )
}

export default AuthState;