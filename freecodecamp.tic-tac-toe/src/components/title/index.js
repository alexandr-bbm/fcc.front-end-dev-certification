import React from 'react';

export default class Title extends React.Component {
    STYLE = {
        textAlign: 'center',
        marginBottom: 20
    };

    render () {
        return (
            <div style={this.STYLE}>{this.props.children}</div>
        )
    }
}
