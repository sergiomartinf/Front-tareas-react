import { useState } from 'react'

function Tarea({id,tarea,terminada,editarTexto,toggleEstado,borrarTarea}){

    let [editando,setEditando] = useState(false)
    let [textoTemporal,setTextoTemporal] = useState(tarea)

    return (
            <div className="tarea">
                <h2 className={ !editando ? "visible" : "" }>{ tarea }</h2>
                <input className={ editando ? "visible" : "" } 
                        type="text" 
                        value={textoTemporal} 
                        onChange={ evento => setTextoTemporal(evento.target.value) } />
                <button className="boton" onClick={ async () => {
                    if(editando){
                        if(textoTemporal.trim() != "" && textoTemporal.trim() != tarea){
                            let {error} = await fetch(`http://localhost:4000/tareas/actualizar/${id}/1`,{
                                method : "PUT",
                                body : JSON.stringify({ tarea : textoTemporal.trim() }),
                                headers : {
                                    "Content-type" : "application/json"
                                }
                            }).then(respuesta => respuesta.json());

                            if(!error){
                                setTextoTemporal(textoTemporal.trim())
                                setEditando(false)
                                return editarTexto(id,textoTemporal.trim())
                            }

                            console.log("mostrar error a usuario");
                            
                        }
                        setTextoTemporal(tarea)
                        setEditando(false)
                    }else{
                        setEditando(true)
                    }
                } }>{ editando ? "guardar" : "editar" }</button>
                <button className="boton" onClick={ () => {
                    fetch(`http://localhost:4000/tareas/borrar/${id}`,{
                        method : "DELETE"
                    })
                    .then(respuesta => respuesta.json())
                    .then(({error}) => {
                        if(!error){
                            return borrarTarea(id)
                        }
                        console.log("mostrar error a usuario")
                    })
                } }>borrar</button>
                <button 
                    className={ `estado ${ terminada ? "terminada" : "" }` }
                    onClick={ () => {
                        fetch(`http://localhost:4000/tareas/actualizar/${id}/2`,{
                            method : "PUT"
                        })
                        .then(respuesta => respuesta.json())
                        .then(({error}) => {
                            if(!error){
                                return toggleEstado(id);
                            }
                            console.log("mostrar error a usuario")
                        })
                    } }
                    ><span></span></button>
            </div>
            )
}

export default Tarea