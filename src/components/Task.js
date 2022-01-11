const Task = ({ task, tasks, setIdTask, setTasks }) => {

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

    const deleteTask = (id, e) => {
        e.preventDefault();
    
        setTasks(tasks.filter(task => {
          return task.id !== id;
        }));
    }

    return (
        <li 
            className="collection-item"
        >
            <span 
                className={ task.completed ? 'crossed-text' : '' }
                id={ task.id }
                onClick={ e => changeTask(task.id, e) }
            >
                { task.nameTask }
            </span>
            <div className="secondary-content task">
                <button 
                    className="waves-effect btn btn-small btn-floating purple white-text valign-wrapper"
                    onClick={ () => setIdTask(task.id) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" /><line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                </button>
                <button 
                    className="waves-effect btn btn-small btn-floating red white-text valign-wrapper"
                    onClick={ e => deleteTask(task.id, e) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
            </div>
        </li>
    );
}
 
export default Task;