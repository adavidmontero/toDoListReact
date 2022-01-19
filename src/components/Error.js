import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => {
    return ( 
        <div className="card red darken-4 white-text center-align">
            <div className="card-content">
                <p>{ message }</p>
            </div>
        </div>
     );
}

Error.propTypes = {
    message: PropTypes.string.isRequired
};
 
export default Error;