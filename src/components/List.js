import PropTypes from 'prop-types';

const List = ({ list, lists, idSelected, tasks, setIdSelected, setIdList, setLists, setTasks }) => {

    const selectedList = (id, e) => {
        e.preventDefault();
    
        //Quita la selección en caso de que esté dando click a la misma lista
        if (id === idSelected) {
          setIdSelected('');
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

    const deleteList = (id, e) => {
        e.preventDefault();
        if (id === idSelected) {
          setIdSelected('');
        }
    
        setTasks(tasks.filter(task => {
          return task.idList !== id;
        }));
    
        setLists(lists.filter(list => {
          return list.id !== id;
        }));
    }

    return (
        <li 
            className="collection-item list-item"
            id={ list.id }
        >
            <div 
                className="main-content"
                onClick={ e => selectedList(list.id, e) }
            >
                <h6 className="title">
                    { list.name }
                </h6>
                <p>
                    Tareas completadas: { tasks.filter(task => (task.idList === list.id && task.completed)).length }
                    <span> | </span>
                    Tareas totales: { tasks.filter(task => (task.idList === list.id)).length }
                </p>
                <progress
                    value={ tasks.filter(task => (task.idList === list.id && task.completed)).length }
                    max={ tasks.filter(task => (task.idList === list.id)).length }
                ></progress>
            </div>
            <div className="secondary-content list">
                <button 
                    className="waves-effect btn btn-small btn-floating purple white-text"
                    onClick={ () =>  setIdList(list.id) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" /><line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                </button>
                <button 
                    className="waves-effect btn btn-small btn-floating red white-text"
                    onClick={ e => deleteList(list.id, e) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
            </div>
        </li>
    );
}

List.propTypes = {
    list: PropTypes.object.isRequired, 
    lists: PropTypes.array.isRequired, 
    idSelected: PropTypes.string.isRequired, 
    tasks: PropTypes.array.isRequired, 
    setIdSelected: PropTypes.func.isRequired, 
    setIdList: PropTypes.func.isRequired, 
    setLists: PropTypes.func.isRequired, 
    setTasks: PropTypes.func.isRequired
};
 
export default List;