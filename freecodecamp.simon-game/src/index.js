import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

import 'styles/main.scss';
import SimonGame from 'containers/SimonGame';

const store = configureStore();

render(
    <Provider store={store}>
        <SimonGame />
    </Provider>,
    document.getElementById('content-entry')
);