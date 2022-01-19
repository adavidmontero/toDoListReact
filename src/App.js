import React, { useState, useEffect, Fragment } from 'react';
import FormList from './components/FormList';
import FormTask from './components/FormTask';
import Lists from './components/Lists';
import Tasks from './components/Tasks';
import './App.css';

function App() {

  let initialLists = JSON.parse(localStorage.getItem('lists'));
  let initialTasks = JSON.parse(localStorage.getItem('tasks'));

  //Si no hay nada le asignamos un array vacío
  if(!initialLists) {
    initialLists = [];
  }

  if(!initialTasks) {
    initialTasks = [];
  }

  //State que contiene todas listas creadas
  const [lists, setLists] = useState(initialLists);

  //State que contiene la lista seleccionada
  const [idSelected, setIdSelected] = useState('');

  //State que contiene todas las tareas
  const [tasks, setTasks] = useState(initialTasks);

  //State que contiene el id para editar la lista
  const [idList, setIdList] = useState('');

  //State que contiene el id para editar la tarea
  const [idTask, setIdTask] = useState('');

  useEffect(() => {
    let initialLists = JSON.parse(localStorage.getItem('lists'));
    
    if(initialLists) {
      localStorage.setItem('lists', JSON.stringify(lists));
    } else {
      localStorage.setItem('lists', JSON.stringify([]));
    }
  }, [lists]);

  useEffect(() => {
    let initialTasks = JSON.parse(localStorage.getItem('tasks'));
    
    if(initialTasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }, [tasks]);

  return (
    <div className="dark-text">
      <div className="row">
        <div className="col s12 bg-gray z-depth-2">
          <div className="section center-align">
            <h5 className="main-title">to do list project</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card bg-gray z-depth-2">
            <div className="card-content">
              <FormList
                lists = { lists }
                idList = { idList }
                setLists = { setLists }
                setIdList = { setIdList }
              />
              {
                lists.length !== 0
                ?
                  <Lists
                    idSelected = { idSelected }
                    lists = { lists }
                    tasks = { tasks }
                    setIdSelected = { setIdSelected }
                    setIdList = { setIdList }
                    setLists = { setLists }
                    setTasks = { setTasks } 
                  />
                :
                  <p className="center-align">No hay listas guardadas</p>
              }
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card bg-gray z-depth-2">
              <div className="card-content">
                {
                  idSelected
                  ?
                    <Fragment>
                      <FormTask
                        idSelected = { idSelected }
                        idTask = { idTask }
                        tasks = { tasks }
                        setIdTask = { setIdTask }
                        setTasks = { setTasks }
                      /> 
                      {
                        tasks.filter(task => (task.idList === idSelected)).length > 0
                        ?
                          <Tasks
                            idSelected = { idSelected }
                            tasks = { tasks }
                            setIdTask = { setIdTask }
                            setTasks = { setTasks }
                          />
                        :
                          <p className="center-align">Esta lista aún no cuenta con tareas.</p>
                      }   
                    </Fragment>     
                  :
                    <p className="center-align">
                      Seleccione una lista primero, en caso de no tenerla deberá crearla
                    </p>
                }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
