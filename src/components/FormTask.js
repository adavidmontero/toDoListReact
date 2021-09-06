import React, { useState, useEffect } from 'react';
import ShortUniqueId from 'short-unique-id';
import Error from './Error';

const FormTask = ({ idSelected, tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: '', nameTask: '', completed: false, idList: idSelected
    });

    const [error, setError] = useState(false);

    const { nameTask } = task;

    useEffect(() => {
        setTask({ ...task, idList: idSelected });
    }, [idSelected]);

    const setStateTask = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    }

    const saveTask = e => {
        e.preventDefault();

        if (nameTask.trim() === '') {
            setError(true);
            return ;
        }

        setError(false);

        //Generamos el id en el state
        let uid = new ShortUniqueId({
            dictionary: 'alpha_lower'
        });
        task.id = uid();

        setTasks([
            ...tasks,
            task
        ]);

        setTask({
            id: '', nameTask: '', completed: false, idList: idSelected
        });
    }

    const setLabelTask = () => {
        if (nameTask === '') {
            document.querySelector('#label-nameTask').removeAttribute('class')
        }
    };

    return ( 
        <form>
            {
                error 
                ?
                    <Error message="¡Ingrese el nombre de la tarea!" />
                :
                    null
            }
            <div className="row">
                <div className="input-field col s8">
                    <input id="nameTask" type="text" className="validate" name="nameTask" 
                        onChange={ setStateTask } 
                        onFocus={ () => { document.querySelector('#label-nameTask').setAttribute('class', 'active') } }
                        onBlur={ setLabelTask }
                        value={ nameTask }
                    />
                    <label htmlFor="nameTask" id="label-nameTask">Nombre de la tarea</label>
                </div>
                <div className="input-field col s4">
                    <button 
                        className="waves-effect waves-light btn"
                        onClick = { saveTask }
                    >Agregar</button>
                </div>
            </div>
        </form>
     );
}
 
export default FormTask;