import './style.scss';
import React, {Component} from 'react';

export default class Copyright extends Component {
    render () {
        return (
            <div className="copyright">
                Made by: <a href="mailto:alexandr.bbm@gmail.com">Alexander Gazizov</a>
            </div>
        )
    }
}