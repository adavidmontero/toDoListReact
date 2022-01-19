import Task from "./Task";
import PropTypes from 'prop-types';

const Tasks = ({ idSelected, tasks, setIdTask, setTasks }) => {
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h6>Tareas de esta lista</h6>
            </li>
            {
                tasks.filter(task => (task.idList === idSelected)).map(task => (
                    <Task
                        key = { task.id }
                        task = { task }
                        tasks = { tasks }
                        setIdTask = { setIdTask }
                        setTasks = { setTasks }
                    />
                ))
            }
        </ul>
    );
}

Tasks.propTypes = {
    idSelected: PropTypes.string.isRequired, 
    tasks: PropTypes.array.isRequired, 
    setIdTask: PropTypes.func.isRequired, 
    setTasks: PropTypes.func.isRequired
};
 
export default Tasks;