import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';

export default function SideBar() {
    return (
        <aside>
            <h1>MERN<span>Task</span></h1>

            <NuevoProyecto/>

            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListadoProyectos/>
            </div>
        </aside>
    )
}
