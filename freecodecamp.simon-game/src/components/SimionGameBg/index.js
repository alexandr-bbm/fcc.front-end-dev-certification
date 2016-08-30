import React from 'react';

import './style.scss';

const SimionGameBg = (props) => {
    return (
        <div className="simon-game-bg">
            {props.children}
        </div>
    )
};

export default SimionGameBg;