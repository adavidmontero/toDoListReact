import React, { useState, useEffect } from 'react';
import ShortUniqueId from 'short-unique-id';
import Error from './Error';

const FormTask = ({ idSelected, idTask, tasks, setIdTask, setTasks }) => {

    const [task, setTask] = useState({
        id: '', nameTask: '', completed: false, idList: idSelected
    });

    const [error, setError] = useState(false);

    const { nameTask } = task;

    useEffect(() => {
        setTask({ ...task, idList: idSelected });
        //eslint-disable-next-line
    }, [idSelected]);

    useEffect(() => {
        if (idTask) {
            setTask(tasks.filter(t => t.id === idTask)[0]);
            document.querySelector('#label-nameTask').focus();
        }
        //eslint-disable-next-line
    }, [idTask]);

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

    const updateTask = e => {
        e.preventDefault();

        if (nameTask.trim() === '') {
            setError(true);
            return ;
        }

        setError(false);

        setTasks(tasks.map(t => t.id === idTask ? task : t));

        clearEdition();
    }

    const clearEdition = () => {
        setTask({
            id: '', nameTask: '', completed: false, idList: idSelected
        });

        setIdTask(null);
        setError(false);
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
                {
                    idTask
                    ?
                        <div className="input-field col s4 group">
                            <button 
                                className="waves-effect btn purple"
                                onClick = { updateTask }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-floppy" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><circle cx="12" cy="14" r="2" /><polyline points="14 4 14 8 8 8 8 4" /></svg>
                            </button>
                            <button className="btn transparent" onClick={ clearEdition }>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>
                    :
                        <div className="input-field col s4">
                            <button 
                                className="waves-effect btn"
                                onClick = { saveTask }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </button>
                        </div>
                }
            </div>
        </form>
     );
}
 
export default FormTask;