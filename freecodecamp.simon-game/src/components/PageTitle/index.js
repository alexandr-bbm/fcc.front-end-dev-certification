import React from 'react';

import './style.scss';

const PageTitle = (props) => {
    return (
        <div className="page-title">
            {props.children}
        </div>
    )
};
export default PageTitle;
