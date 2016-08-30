import React, {Component} from 'react';
import { render } from 'react-dom';
import './styles/main.scss';

import Calculator from './components/Calculator/index';
import Tips from './components/Tips/index';
import Copyright from './components/Copyright/index';

class App extends Component { 
    render () {
        return (
            <div className="app background">
                <div className="wrapper">
                    <div className="papers">
                        <Calculator />
                        <Tips />
                        <Copyright />
                    </div>
                </div>
            </div>
        )
    } 
}

render(<App />, document.getElementById('content-entry'));