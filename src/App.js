import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import FormList from './components/FormList';
import FormTask from './components/FormTask';

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
  const [idSelected, setIdSelected] = useState(null);

  //State que contiene todas las tareas
  const [tasks, setTasks] = useState(initialTasks);

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
  

  const selectedList = (id, e) => {
    e.preventDefault();

    //Quita la selección en caso de que esté dando click a la misma lista
    if (id === idSelected) {
      setIdSelected(null);
      document.querySelector(`#${id}`).setAttribute('class', 'collection-item');
    } else if (id !== idSelected && idSelected) {
      //Cambiar elemento seleccionado por otro
      document.querySelector(`#${idSelected}`).setAttribute('class', 'collection-item');
      setIdSelected(id);
      document.querySelector(`#${id}`).setAttribute('class', 'collection-item active');
    } else {
      //Nueva lista seleccionada
      setIdSelected(id);
      document.querySelector(`#${id}`).setAttribute('class', 'collection-item active');
    }
  };

  const changeTask = (id, e) => {
    e.preventDefault();

    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
        if (task.completed) {
          document.querySelector(`#${id}`).setAttribute('class', 'crossed-text');
        } else {
          document.querySelector(`#${id}`).setAttribute('class', '');
        }
      }
      
      return task;
    });

    setTasks(newTasks);    
  }

  const deleteList = (id, e) => {
    e.preventDefault();
    if (id === idSelected) {
      setIdSelected(null);
    }

    setTasks(tasks.filter(task => {
      return task.idList !== id;
    }));

    setLists(lists.filter(list => {
      return list.id !== id;
    }));
  }

  const deleteTask = (id, e) => {
    e.preventDefault();

    setTasks(tasks.filter(task => {
      return task.id !== id;
    }));
  }

  return (
    <div className="dark-text">
      <div className="row">
        <div className="col s12 bg-gray z-depth-2">
          <div className="section center-align">
            <h5 style={{ textTransform: "uppercase" }}>to do list project</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card bg-gray z-depth-2">
            <div className="card-content">
              <FormList
                lists = { lists }
                setLists = { setLists }
              />
              {
                lists.length !== 0
                ?
                  <ul className="collection with-header">
                    <li className="collection-header" style={{ listStyle: "none", textAlign: "center" }}>
                      <h6>Listas Guardadas</h6>
                    </li>
                    {
                      lists.map(list => (
                        <li 
                          className="collection-item" 
                          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} 
                          key = { list.id }
                          id={ list.id }
                        >
                          <div 
                            onClick={ e => selectedList(list.id, e) } 
                            style={{ cursor: "pointer", width: "100%" }}
                          >
                            <p>
                              { list.name }
                            </p>
                            <p>
                              Tareas completadas: {tasks.filter(task => (task.idList === list.id && task.completed)).length}
                              <span> | </span>
                              Tareas totales: {tasks.filter(task => (task.idList === list.id)).length}
                            </p>
                            <progress 
                              style={{width: "95%"}}
                              value={tasks.filter(task => (task.idList === list.id && task.completed)).length}
                              max={tasks.filter(task => (task.idList === list.id)).length}
                              ></progress>
                          </div>
                          <button 
                            className="waves-effect btn btn-small btn-floating red white-text"
                            onClick={ e => deleteList(list.id, e) }
                          >
                            &times;
                          </button>
                        </li>
                      ))
                    }
                  </ul>
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
                        tasks = { tasks }
                        setTasks = { setTasks }
                      /> 
                      {
                        tasks.filter(task => (task.idList === idSelected)).length > 0
                        ?
                          <ul className="collection with-header">
                            <li className="collection-header" style={{ listStyle: "none", textAlign: "center" }}>
                              <h6>Tareas de esta lista</h6>
                            </li>
                            {
                              tasks.filter(task => (task.idList === idSelected)).map(task => (
                                <li 
                                  className="collection-item" 
                                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} 
                                  key = { task.id }
                                >
                                  <span 
                                    onClick={ e => changeTask(task.id, e) }
                                    className={ task.completed ? 'crossed-text' : '' }
                                    id={ task.id }
                                    style={{ cursor: "pointer", width: "100%" }}
                                  >
                                    { task.nameTask }
                                  </span>
                                  <button 
                                    className="waves-effect btn btn-small btn-floating red white-text"
                                    onClick={ e => deleteTask(task.id, e) }
                                  >
                                    &times;
                                  </button>
                                </li>
                              ))
                            }
                          </ul>
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
