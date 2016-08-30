import React, { Component } from 'react';
import './style.scss';

export default class Layout extends Component {
    render () {
        return (
            <div className="layout">
                <div className="layout__inner">
                    {this.props.children}
                </div>
            </div>
        )
    }

}