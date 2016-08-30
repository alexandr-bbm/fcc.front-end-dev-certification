import React from 'react';

import './style.scss';

export default class Counter extends React.Component {

    static propTypes = {
        number: React.PropTypes.number.isRequired,
    };

    render () {
        const {number} = this.props;
        return (
            <div className="counter">
                SCORE: {number >= 0 ? number : '-'}
            </div>
        )
    }
}

