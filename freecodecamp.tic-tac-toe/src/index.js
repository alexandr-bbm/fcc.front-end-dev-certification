import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from 'components/layout';
import TicTacToe from 'components/tic-tac-toe';
import Paper from 'material-ui/Paper';


injectTapEventPlugin();

import './styles/main.scss';

const paperStyle = {
    padding: '50px',
    minWidth: '500px',
    display: 'flex'
};

const App = () => (
    <MuiThemeProvider>
        <Layout>
              <Paper style={paperStyle} zDepth={2} >
                  <TicTacToe />
              </Paper>
        </Layout>
    </MuiThemeProvider>
);

render(<App />, document.getElementById('app-entry'));