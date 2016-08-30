import React from 'react';

import initialArray from 'helpers/initialArray';
import chunk from 'lodash/chunk';
import random from 'lodash/random';

import Snackbar from 'material-ui/Snackbar';
import TableLayout from 'components/table-layout';
import ChooseTeam from 'components/choose-team';
import Title from 'components/title';
import StatusBar from 'components/status-bar';
import {Grid, Row, Col} from 'react-bootstrap';

import ContentClear from 'material-ui/svg-icons/content/clear';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';


import './style.scss';

const ICONS_STYLE = {
    width: 48,
    height: 48,
    color: 'transparent'
};

const ICONS_WIN_STYLE = {
    width: 48,
    height: 48,
    color: '#ff0000',
    stroke: '#ff0000',
};

export default class TicTacToe extends React.Component {

    SIZE = 3;

    CELLS_COUNT = this.SIZE ** 2;

    TEAMS = {
        Xs: 0,
        Os: 1,
    };

    CONTENT = {
        [this.TEAMS.Xs]: <ContentClear style={ICONS_STYLE} />,
        [this.TEAMS.Os]: <RadioButtonUnchecked style={ICONS_STYLE} />,
    };

    WIN_CONTENT = {
        [this.TEAMS.Xs]: <ContentClear style={ICONS_WIN_STYLE} />,
        [this.TEAMS.Os]: <RadioButtonUnchecked style={ICONS_WIN_STYLE} />,
    };

    NAMES = {
        [this.TEAMS.Xs]: 'Crosses',
        [this.TEAMS.Os]: 'Noughts'
    };

    EMPTY_CELL = '';

    WIN_COMBINATIONS = getWinCombinations(this.SIZE);

    makeClearGround () {
        return initialArray(this.CELLS_COUNT, this.EMPTY_CELL);
    }

    state = {
        ground: this.makeClearGround(),
        USER_TEAM: this.TEAMS.Xs,
        turn: this.TEAMS.Xs,
        snackBar: {
            message: '',
            open: false
        },
        gameRunning: true,
        justWon: false,
        winningCombination: null
    };

    /**
     * Begins a game from clear ground
     */
    start () {
        this.setState({
            gameRunning: true,
            ground: this.makeClearGround(),
            turn: this.TEAMS.Xs,
            justWon: false,
            winningCombination: null
        }, this.handleTurn);
    }

    handleTurn () {
        const {turn, USER_TEAM} = this.state;
        if (turn !== USER_TEAM) {
            this.processComputerTurn();
        }
    }

    /**
     * Stops the game and clears ground.
     */
    stop () {
        this.setState({
            ground: this.makeClearGround(),
            turn: this.TEAMS.Xs,
            gameRunning: false,
            justWon: false,
            winningCombination: null

        })
    }

    processUserTurn (cellId) {
        const {turn, ground, USER_TEAM} = this.state;
        if (turn === USER_TEAM && ground[cellId] === this.EMPTY_CELL) {
            ground[cellId] = turn;
            this.setState({ground}, this.beforeNextTurn);
        }
    }

    processComputerTurn () {
        if (this.state.gameRunning) {
            const computerThinkTime = random(500, 2000);
            setTimeout(()=> {
                const ground = this.chooseComputerTurn();
                this.setState({ground}, this.beforeNextTurn);
            }, computerThinkTime)
        }
    }

    /**
     *
     * @returns {array} New ground with next computer turn
     */
    chooseComputerTurn () {

        let {ground, turn, USER_TEAM} = Object.assign({}, this.state);

        /**
         * Id of a cell computer will go to.
         * @type {boolean|number}
         */
        let cellId = false;

        /**
         *  Chooses random unoccupied cell.
         */
        while (cellId === false || ground[cellId] !== this.EMPTY_CELL) {
            cellId = random(0, this.CELLS_COUNT - 1);
        }

        /**
         * Checks center cell
         */
        if (this.EMPTY_CELL === ground[4]) {
            cellId = 4;
        }


        /**
         * Checks if next turn of computer can be winning
         * @type {number}
         */
        const nextComputerWinCell = this.checkWinnerOnNextTurn(! + USER_TEAM)['nextWinningCell'];
        if (nextComputerWinCell) {
            cellId = nextComputerWinCell;
        }


        /**
         * Checks if next turn of user can be winning
         * @type {number}
         */
        const nextUserWinCell = this.checkWinnerOnNextTurn(USER_TEAM)['nextWinningCell'];
        if (nextUserWinCell) {
            cellId = nextUserWinCell;
        }

        ground[cellId] = turn;
        return ground;
    }

    beforeNextTurn () {
        if (this.checkWinner() || this.checkDraw()) {
            return;
        }
        let {turn} = this.state;
        turn = +!turn;
        this.setState({turn}, this.handleTurn);
    }

    /**
     * Displays a `message` to user and waits for 2 seconds
     * @param message
     * @returns {Promise}
     */
    snackBar (message) {
        return new Promise((resolve) => {
            this.setState({
                snackBar: {
                    open: true,
                    message: message
                }
            });
            setTimeout(resolve, 2000);
        })
    }

    /**
     * Checks if we have a winner and alerts its name.
     * @returns {boolean}
     */
    checkWinner () {
        const {weHaveAWinner, winnerTeam, winningCombination} = this.checkWinnerByGround();

        if (weHaveAWinner) {
            const justWon = true;
            this.setState({
                justWon,
                winningCombination,
            });
            this.snackBar(`${this.NAMES[winnerTeam]} won!`).then(() => this.start());
            return true;
        }
        return false;
    }

    /**
     * @param ground array
     * @returns {{weHaveAWinner: boolean, winnerTeam: number, winningCombination: array}}
     */
    checkWinnerByGround (ground = this.state.ground.slice()) {
        let winnerTeam = null,
            nextWinningCell = null,
            winningCombination = null;

        const weHaveAWinner = this.WIN_COMBINATIONS.some((combination) => {
            const oneTeamAtCombination = combination.every((val, idx, arr) => {
                return (ground[val] === ground[arr[0]] && ground[arr[0]] !== this.EMPTY_CELL)
            });
            if (oneTeamAtCombination) {
                winnerTeam = ground[combination[0]];
                winningCombination = combination;
                nextWinningCell = (combination.filter((cellId) => this.state.ground[cellId] === this.EMPTY_CELL))[0];
            }
            return oneTeamAtCombination;
        });
        return {
            weHaveAWinner,
            winnerTeam,
            winningCombination,
            nextWinningCell
        }
    }

    checkWinnerOnNextTurn (team, ground = this.state.ground.slice()) {
        const vacantCells = ground
            .map((cell, idx) => {
                if (cell === this.EMPTY_CELL) {
                    return idx;
                }
            })
            .filter((val) => val !== undefined);

        let nextPossibleGrounds = vacantCells.map((cell) => {
            const nextPossibleGround = ground.slice();
            nextPossibleGround[cell] = + team;
            return nextPossibleGround;
        });

        let winnerInfo = null;
        const nextWin = nextPossibleGrounds.some((possibleGround) => {
            winnerInfo = this.checkWinnerByGround(possibleGround);
            return winnerInfo['weHaveAWinner'];
        });

        if (nextWin) {
            return winnerInfo;
        }

        return false;
    }

    /**
     * Checks if we have a draw and alerts.
     * @returns {boolean}
     */
    checkDraw () {
        const {ground} = this.state;
        if (ground.indexOf(this.EMPTY_CELL) === -1) {
            this.snackBar(`It\'s a draw!`).then(() => this.start());
            return true;
        }
        return false;
    }

    changeUserTeam (val) {
        this.setState({
            USER_TEAM: +val
        })
    }


    onCellClick = (e) => this.processUserTurn(e.target.dataset.cellId);
    onPlayClick = () => this.start();
    onStopClick = () => this.stop();

    onTeamChange = (e, val) => this.changeUserTeam(val);

    onSnackbarClose = () => this.setState({
        snackBar: {
            open: false,
            message: ''
        }
    });


    render () {
        const {snackBar, gameRunning, turn, USER_TEAM, justWon, winningCombination} = this.state;
        const groundContent = this.state.ground.map((num) => this.CONTENT[num]);

        let statusHint;
        if (gameRunning) {
            statusHint = turn == USER_TEAM ? 'It\'s your turn!' : 'Computer thinks ...';
        } else {
            statusHint = 'Game stopped.'
        }
        return (
            <Grid className="ttt" fluid={true}>
                <Row>
                    <Col sm={12}>
                        <Title>The Tic Tac Toe Game</Title>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <TableLayout className="ttt-ground"
                                     numberOfRows={this.SIZE}
                                     onCellClick={this.onCellClick}
                                     cellData={groundContent}
                        />
                    </Col>
                    <Col sm={4}>
                        <Title>{statusHint}</Title>
                        <div style={{textAlign: 'center'}}>
                            <StatusBar onPlayClick={this.onPlayClick}
                                       onStopClick={this.onStopClick}
                                       isRunning={gameRunning}
                            />
                        </div>
                        <ChooseTeam onChange={this.onTeamChange}
                                    isDisabled={gameRunning}
                        />
                    </Col>
                </Row>
                <Snackbar open={snackBar.open}
                          message={snackBar.message}
                          onRequestClose={this.onSnackbarClose}
                />
            </Grid>
        )
    }
};

/**
 * @param n The dimension of square ground.
 * @returns {Array} Contains arrays of win combinations for square field n*n.
 */
function getWinCombinations (n) {
    let combinations = [];

    const cellNums = [...Array(n * n)].map((x, i) => i);
    const horizontalCombinations = chunk(cellNums, n);

    const colNums = [...Array(n)].map((x, i) => i);

    const verticalCombinations = colNums.map((colNum) => {
        let verticalCombination = [];
        for (let rowNum = 0; rowNum < n; rowNum++) {
            verticalCombination.push(colNum + n * rowNum);
        }
        return verticalCombination;
    });

    let mainDiagonal = [];
    let notMainDiagonal = [];
    for (let rowNum = 0; rowNum < n; rowNum++) {
        mainDiagonal.push(rowNum * (n + 1));
        notMainDiagonal.push((n - 1) * (1 + rowNum));
    }

    const diagonalCombinations = [mainDiagonal, notMainDiagonal];

    return combinations.concat(horizontalCombinations, verticalCombinations, diagonalCombinations);
}

