import List from "./List";
import PropTypes from 'prop-types';

const Lists = ({ idSelected, lists, tasks, setIdSelected, setIdList, setLists, setTasks }) => {
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h6>Listas Guardadas</h6>
            </li>
            {
                lists.map(list => (
                    <List
                        key = { list.id }
                        list = { list }
                        lists = { lists }
                        idSelected = { idSelected }
                        tasks = { tasks }
                        setIdSelected = { setIdSelected }
                        setIdList = { setIdList }
                        setLists = { setLists }
                        setTasks = { setTasks }
                    />
                ))
            }
        </ul>
    );
}

Lists.propTypes = {
    idSelected: PropTypes.string.isRequired, 
    lists: PropTypes.array.isRequired, 
    tasks: PropTypes.array.isRequired, 
    setIdSelected: PropTypes.func.isRequired, 
    setIdList: PropTypes.func.isRequired, 
    setLists: PropTypes.func.isRequired, 
    setTasks: PropTypes.func.isRequired
};
 
export default Lists;