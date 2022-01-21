import React,{useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from '../context/autenticacion/authContext';

const RutaPrivada = ({ children }) => {
    
    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;
    
    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);
    

    return autenticado && !cargando ? children : <Navigate to="/" />
        
}

export default RutaPrivada;