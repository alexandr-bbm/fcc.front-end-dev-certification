import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import './styles/main.scss';
import App from './containers/App';
import ShatteredPopup from './myComponents/ShatteredPopup/index';

const store = configureStore();

render(
    <Provider store={store}>
        <App className="app" />
    </Provider>,
    document.getElementById('content-entry')
);