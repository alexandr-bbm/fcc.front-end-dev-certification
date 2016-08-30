import React, { Component } from 'react';
import { render } from 'react-dom';
import Timer from './components/Timer/index.js';

import './styles/main.scss';

class App extends Component {
    render () {
        return (
            <div className="app background">
                <Timer />
            </div>
        )
    }
}

render(<App />, document.getElementById('content-entry'));