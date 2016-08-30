import './style.scss';
import React, {Component} from 'react';

export default class Calculator extends Component {

    defaultDisplayVal = '0.';

    state = {
        display: this.defaultDisplayVal,
        supportingDisplay: this.defaultDisplayVal,
        isJustCalculated: false,
        defaultState: true,
    };

    operationsCharCodes = [
        42, // *
        45, // -
        43, // +
        47 // /
    ];

    operationsRegExp = new RegExp(/\*|\+|\-|\//);

    componentDidMount () {
        this.bindKeys();
    }

    bindKeys () {
        // todo tell user
        document.addEventListener('keypress', (event) => {
            // digit or decimal point
            const charCode = event.charCode;
            if (charCode >= 48 && charCode <= 57 || charCode === 46) {
                return this.processDigit(String.fromCharCode(charCode));
            }
            // operator
            if (this.operationsCharCodes.indexOf(charCode) !== -1) {
                return this.processOperator(String.fromCharCode(charCode));
            }
            // equal sign or rnter
            if (charCode === 61) {
                return this.calculate();
            }
        });
        document.addEventListener('keyup', (event) => {
            // digit or decimal point
            const charCode = event.keyCode;
            // escape
            if (charCode === 27) {
                return this.clearAll();
            }
            // backspace
            if (charCode === 8) {
                return this.clearLast();
            }
            //enter
            if (charCode === 13) {
                return this.calculate();
            }
        })
    }

    componentWillUnmount () {
        //document.removeEventListener('keyup.calculator');
    }

    static makeButtonsInRows (clickFn, buttonsCount = 9, buttonsPerRow = 3) {
        const rows = [];
        const rowsNumber = Math.ceil(buttonsCount / buttonsPerRow);
        for (let i = rowsNumber - 1; i >= 0; i--) {
            let rowButtons = [];
            for (let j = buttonsPerRow; j > 0; j--) {
                rowButtons.unshift(
                    <Button value={i*buttonsPerRow + j} onClick={clickFn} key={j} />
                )
            }
            rows.push((
                <div className="calculator__row" key={i}>
                    {rowButtons}
                </div>
            ))
        }
        return rows;
    }

    onDigitClick = (e) => {
        this.processDigit(e.target.textContent);
    };
    onOperatorClick = (e) => {
        this.processOperator(e.target.textContent);
    };

    /**
     * Simply add digit or point to display
     * @param input
     */
    processDigit = (input) => {
        let display = this.state.display;
        let supportingDisplay = this.state.supportingDisplay;

        if (this.lineIsTooLong) {
            return;
        }

        if (input === '.' && (this.lastIsNotDigit || this.lastIsPoint)) {
            return;
        }

        if (this.state.isJustCalculated || this.state.defaultState) {
            display = input;
            this.setState({
                display,
                supportingDisplay: display,
                isJustCalculated: false,
                defaultState: false
            });
            return;
        }

        display += input;
        supportingDisplay += input;
        this.setState({
            display,
            supportingDisplay
        });


    };

    processOperator = (operator) => {
        let display = this.state.display;
        let supportingDisplay = this.state.supportingDisplay;

        if (this.lastIsNotDigit || this.lineIsTooLong) {
            return;
        }

        if (this.state.isJustCalculated) {
            display += operator;
            this.setState({
                display,
                supportingDisplay: display,
                isJustCalculated: false
            });
            return;
        }

        const alreadyHasOperator = display.match(this.operationsRegExp);
        supportingDisplay += operator;
        if (alreadyHasOperator) {
            this.setState({
                display: eval(display) + operator,
                supportingDisplay
            });
        } else {
            display += operator;
            this.setState({
                display,
                supportingDisplay
            });
        }
    };

    get lastIsNotDigit () {
        return this.state.display.slice(-1).match(/[^0-9]/)
    }
    get lastIsPoint () {
        //return !!this.state.display.slice(-1).match(/\D/)
        return this.state.display.slice(-1) === '.'
    }

    get lineIsTooLong () {
        return this.state.display.length > 15;
    }

    clearAll = () => {
        this.setState({
            display: this.defaultDisplayVal,
            supportingDisplay: this.defaultDisplayVal,
            defaultState: true
        })
    };
    clearLast = () => {
        if (this.state.display.slice(0, -1) == '' || this.state.defaultState) {
            return this.clearAll();
        }
        this.setState({
            display: this.state.display.slice(0, -1),
            supportingDisplay: this.state.supportingDisplay.slice(0, -1)
        })
    };

    calculate = () => {
        if (this.lastIsNotDigit) {
            return;
        }
        const calculatedExp = eval(this.state.display).toString();
        this.setState({
            display: calculatedExp,
            supportingDisplay: `${this.state.supportingDisplay}=${calculatedExp}`,
            isJustCalculated: true
        })
    };

    render () {
        const numberButtons = Calculator.makeButtonsInRows(this.onDigitClick);
        return (
            <div className="calculator">
                <div className="calculator__title">Calculator</div>
                <div className="calculator__display">
                    <input type="text" className="calculator__display-input" readOnly disabled value={this.state.display} />
                </div>
                <div className="calculator__display calculator__display_supporting">
                    <input type="text" className="calculator__display-input calculator__display-input_supporting"
                           readOnly disabled value={this.state.supportingDisplay} />
                </div>
                <div className="calculator__buttons-container">
                    <div className="calculator__col calculator__col_digits">
                        {numberButtons}
                        <div className="calculator__row">
                            <Button value="0" onClick={this.onDigitClick} />
                            <Button value="00" onClick={this.onDigitClick} />
                            <Button value="." onClick={this.onDigitClick} />
                        </div>
                    </div>
                    <div className="calculator__col calculator__col_operations">
                        <div className="calculator__row">
                            <Button value="AC" onClick={this.clearAll} />
                            <Button value="CE" onClick={this.clearLast} />
                        </div>
                        <div className="calculator__row">
                            <Button value="*" onClick={this.onOperatorClick} />
                            <Button value="+" onClick={this.onOperatorClick} />
                        </div>
                        <div className="calculator__row">
                            <Button value="-" onClick={this.onOperatorClick} />
                            <Button value="/" onClick={this.onOperatorClick} />
                        </div>
                        <div className="calculator__row">
                            <Button value="=" onClick={this.calculate} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Button extends Component {
    render () {
        const baseClassName = 'calculator__btn',
            {cssModificator} = this.props;
        const className = cssModificator ? `${baseClassName} ${baseClassName}_${cssModificator}` : baseClassName;
        return (
            <button className={className} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}