import React from 'react';

const Error = ({ message }) => {
    return ( 
        <div className="card red darken-4 white-text center-align">
            <div className="card-content">
                <p>{ message }</p>
            </div>
        </div>
     );
}
 
export default Error;