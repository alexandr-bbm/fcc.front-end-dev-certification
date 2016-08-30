import React from 'react';

import './style.scss';

const GuitarBg = (props) => {
    return (
        <div className="guitar-bg">
            {props.children}
        </div>
    )
};

export default GuitarBg;