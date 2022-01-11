import List from "./List";

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
 
export default Lists;