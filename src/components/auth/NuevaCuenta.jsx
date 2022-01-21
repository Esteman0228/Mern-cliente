import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
import {useNavigate} from 'react-router-dom';

export default function NuevaCuenta(props) {
    let history= useNavigate()
    //Extraer state de context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registroUsuario} = authContext;

    //cuando el usuario registre o suceda un error
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
        nombre: '',
        email:'',
        password:'',
        confirmar: ''
    })

    //extraer del usuario
    const {nombre, email, password, confirmar} = usuario;

    //Guardar los datos que escriba el usuario
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
        if(nombre === '' || email === '' || password === '' || confirmar === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Password minimo de 6 caracteres
        if(password.length < 6 ){
            mostrarAlerta('La contraseña debe tener minimo 6 caracteres', 'alerta-error');
            return;
        }
        //Los dos password sean iguales
        if (password !== confirmar){
            mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
            return;
        }
        //ingresar usuario
        registroUsuario({
            nombre,
            email,
            password
        });
    }

    return (
        <div>
            <div className="form-usuario">
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <div className="contenedor-form sombra-dark">
                    <h1>Crea una cuenta nueva</h1>

                    <form
                        onSubmit={onSubmit}
                    >

                        <div className="campo-form">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                placeholder="Tu Nombre"
                                onChange={onChange}
                            />
                        </div>

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

                        <div className="campo-form">
                            <label htmlFor="confirmar">Confirmar Password</label>
                            <input
                                type="password"
                                id="confirmar"
                                name="confirmar"
                                value={confirmar}
                                placeholder="Confirmar Password"
                                onChange={onChange}
                            />
                        </div>

                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
                    </form>

                    <Link to={'/'} className="enlace-cuenta">
                        Regresar a iniciar sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
