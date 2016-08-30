import './style.scss';
import React, {Component} from 'react';

export default class Tips extends Component {
    render () {
        return (
            <div className="tips">
                <div className="tips__title">Tips</div>
                <ul>
                    <li>- Use keyboard to calculate faster</li>
                    <li>- Maximum input length is 22 characters</li>
                </ul>
            </div>
        )
    }
}