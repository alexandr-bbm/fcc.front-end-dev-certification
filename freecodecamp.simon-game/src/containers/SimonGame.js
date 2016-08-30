import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SIMON_SETTINGS from 'constants/simonSettings';

import * as simonGameActions from 'actions/simonGameActions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SimonButtons from 'components/SimonButtons';
import PlayStopBtn from 'components/PlayStopBtn';
import Counter from 'components/Counter';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import GuitarBg from 'components/GuitarBg';
import SimionGameBg from 'components/SimionGameBg';
import PageTitle from 'components/PageTitle';
import PageWrapper from 'components/PageWrapper';

injectTapEventPlugin();

class SimonGame extends React.Component {

    onToggleStricMode = (e, isChecked) => {
        this.props.simonGameActions.toggleStrictMode(isChecked);
    };

    render () {
        const {simonGame, simonGameActions} = this.props;
        return (
            <SimionGameBg>
                <MuiThemeProvider>
                    <PageWrapper>
                        <PageTitle>ROCK SIMON GAME</PageTitle>
                        <GuitarBg>
                            <SimonButtons
                                enabled={simonGame.isGameRunning && simonGame.isWaitingForInput}
                                combination={simonGame.combination}
                                isPlaying={simonGame.combinationIsPlaying}
                                endPlaying={simonGameActions.endPlaying}
                                processWrongInput={simonGameActions.processWrongInput}
                                processRightInput={simonGameActions.processRightInput}
                            />
                        </GuitarBg>
                        <PlayStopBtn
                            isRunning={simonGame.isGameRunning}
                            onPlayClick={simonGameActions.startGame}
                            onStopClick={simonGameActions.stopGame}
                        />
                        <Toggle
                            label="Strict mode"
                            style={{width: '150px !important', 'position': 'absolute', 'left': '500px', 'top': '490px'}}
                            onToggle={this.onToggleStricMode}
                        />
                        <Counter number={simonGame.combination.length - 1} />
                        <Snackbar
                            open={simonGame.snackbar.open}
                            message={simonGame.snackbar.message}
                            onRequestClose={simonGameActions.handleSnackbarClose}
                            autoHideDuration={SIMON_SETTINGS.NOTIFICATIONS_AUTOHIDE_DURATION}
                        />
                    </PageWrapper>
                </MuiThemeProvider>
            </SimionGameBg>
        )
    }
}

function mapStateToProps (state) {
    return {
        simonGame: state.simonGame
    }
}

function mapDispatchToProps (dispatch) {
    return {
        simonGameActions: bindActionCreators(simonGameActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimonGame)