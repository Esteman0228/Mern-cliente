import {
    OBTENER_TAREAS,
    AGREGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREAS
} from '../../types'

const tareaReducer = (state, action) => {
    switch(action.type){
        case OBTENER_TAREAS:
            return{
                ...state,
                tareasproyecto: action.payload
            }
        case AGREGAR_TAREAS:
            return{
                ...state,
                tareasproyecto: [...state.tareasproyecto, action.payload],
                error:false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                error: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.filter(items => items._id !== action.payload)
            }
        case ACTUALIZAR_TAREAS:
            return{
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea=> tarea._id === action.payload._id ? action.payload :tarea),
                tareaseleccionada:null
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                tareaseleccionada: action.payload
            }
        
        default:
            return state;
    }
}

export default tareaReducer;