import React from 'react';

import './style.scss';

const PageWrapper = (props) => {
    return (
        <div className="page-wrapper">
            {props.children}
        </div>
    )
};
export default PageWrapper;
