import React from 'react';
import spinner from './spinner.gif';

function Spinner() {
    return (
        <div>
            <img src={spinner} alt="Loading..." style={{width: '100px', margin: 'auto', display: 'block'}}/>
        </div>
    );
}

export default Spinner;