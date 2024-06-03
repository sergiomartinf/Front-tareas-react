import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Tarea from './Tarea'

function Tareas(){

    let [tareas,setTareas] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/tareas")
        .then(respuesta => respuesta.json())
        .then(tareas => setTareas(tareas))
    }, [])

    function crearTarea(tarea){
        setTareas([...tareas,tarea])
    }

    function toggleEstado(id){
        setTareas(tareas.map( tarea => {
            if(tarea.id == id){
                tarea.terminada = !tarea.terminada
            }
            return tarea
        }))
    }

    function editarTexto(id,texto){
        setTareas(tareas.map( tarea => {
            if(tarea.id == id){
                tarea.tarea = texto
            }
            return tarea
        }))
    }

    function borrarTarea(id){
        setTareas(tareas.filter( tarea => tarea.id != id))
    }

    return (
            <>
            <Formulario crearTarea={crearTarea} />
            <section className="tareas">
                { tareas.map( ({id,tarea,terminada}) => <Tarea 
                                                            key={id} 
                                                            id={id} 
                                                            tarea={tarea} 
                                                            terminada={terminada}
                                                            editarTexto={editarTexto}
                                                            toggleEstado={toggleEstado}
                                                            borrarTarea={borrarTarea} />) }  
            </section>
            </>
            )
}

export default Tareas