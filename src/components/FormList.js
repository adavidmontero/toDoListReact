import React, { useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import Error from './Error';

const FormList = ({ lists, setLists }) => {

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

    const setLabel = () => {
        if (name === '') {
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
                <div className="input-field col s4">
                    <button 
                        className="waves-effect waves-light btn"
                        onClick = { saveList }
                    >Crear</button>
                </div>
            </div>
        </form>
     );
}
 
export default FormList;