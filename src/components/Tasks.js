import Task from "./Task";

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
 
export default Tasks;