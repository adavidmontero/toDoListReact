import React, { useState, useEffect, Fragment } from 'react';
import ShortUniqueId from 'short-unique-id';
import Error from './Error';

const FormList = ({ lists, idList, setLists, setIdList }) => {

    //Definimos el state que contendrá la lista nueva
    const [list, setList] = useState({
        id: '',
        name: ''
    });
    //Definimos el state para controlar los errores
    const [error, setError] = useState(false);

    //Función para controlar los valores de cada propiedad del state de la lista
    const setState = e => {
        setList({
            ...list,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (idList) {
            setList(lists.filter(l => l.id === idList)[0]);
            document.querySelector('#label-name').focus();
        }
        //eslint-disable-next-line
    }, [idList]);

    //Destructuring al state list
    const { name } = list;

    //Función para guardar la lista en el estado de listas
    const saveList = e => {
        e.preventDefault();

        //Validamos que el nombre de la lista no sea vacío
        if (name.trim() === '') {
            setError(true);
            return ;
        }

        //Generamos el id en el state
        let uid = new ShortUniqueId({
            dictionary: 'alpha_lower'
        });
        list.id = uid();

        setError(false);

        //Guardamos la lista en el state que pasamos
        setLists([
            ...lists,
            list
        ]);

        //Reiniciamos los valores
        setList({
            id: '',
            name: ''
        });
    }

    const updateList = e => {
        e.preventDefault();

        //Validamos que el nombre de la lista no sea vacío
        if (name.trim() === '') {
            setError(true);
            return ;
        }

        setError(false);

        //Guardamos la lista en el state que pasamos
        setLists(lists.map(l => l.id === idList ? list : l));

        //Reiniciamos los valores
        clearEdition();
    }

    const clearEdition = () => {
        setList({
            id: '',
            name: ''
        });

        setIdList(null);
        setError(false);
    };

    const setLabel = () => {
        if (!name) {
            document.querySelector('#label-name').removeAttribute('class')
        }
    };

    return ( 
        <form>
            {
                error 
                ?
                    <Error message="¡Ingrese el nombre de la lista!" />
                :
                    null
            }
            <div className="row">
                <div className="input-field col s8">
                    <input id="name" type="text" className="validate" name="name" 
                        onChange={ setState } 
                        onFocus={ () => { document.querySelector('#label-name').setAttribute('class', 'active') } }
                        onBlur={ setLabel }
                        value={ name }
                    />
                    <label htmlFor="name" id="label-name">Nombre de lista</label>
                </div>
                {
                    idList
                    ?
                        <Fragment>
                            <div className="input-field col s2">
                                <button 
                                    className="waves-effect btn purple"
                                    onClick = { updateList }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-floppy" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><circle cx="12" cy="14" r="2" /><polyline points="14 4 14 8 8 8 8 4" /></svg>
                                </button>
                            </div>
                            <div className="input-field col s2">
                                <button className="btn transparent" onClick={ clearEdition }>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            </div>
                        </Fragment>
                    :
                        <div className="input-field col s4">
                            <button 
                                className="waves-effect btn"
                                onClick = { saveList }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </button>
                        </div>
                }
            </div>
        </form>
     );
}
 
export default FormList;