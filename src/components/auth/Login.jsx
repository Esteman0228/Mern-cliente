import React,{useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
import {useNavigate} from 'react-router-dom';


export default function Login(props) {
    let history= useNavigate()

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    //cuando el password o usuario no exista
    useEffect(()=>{
        if(autenticado){
            history('/proyectos');
        }
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);


    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    //extraer del usuario
    const {email, password} = usuario;


    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Cuando presione iniciar
    const onSubmit = e =>{
        e.preventDefault();

        //Validar campos vacíos
        if(email.trim() === '' || password.trim()){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }
        //ingresar usuario
        iniciarSesion({email, password})
    }

    return (
        <div>
            <div className="form-usuario">
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesión</h1>

                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Tu Email"
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Tu Password"
                                onChange={onChange}
                            />
                        </div>

                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
                    </form>

                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </div>
    )
}
