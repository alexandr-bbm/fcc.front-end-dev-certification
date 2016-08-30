import React from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

export default class ChooseTeam extends React.Component {
    STYLES = {
        block: {
            marginTop: 20,
            display: 'inline-block',
            whiteSpace: 'nowrap',
        },
        radioButton: {
            display: 'inline-block',
            width: ''
        }
    };

    render () {
        return (
            <div style={this.STYLES.block}>
                <RadioButtonGroup name="teamSelect"
                                  defaultSelected='0'
                                  onChange={this.props.onChange}
                                  style={{display: 'inline-block'}}
                                  labelPosition="left"
                >
                    <RadioButton
                        value="0"
                        checkedIcon={<ContentClear />}
                        uncheckedIcon={<ContentClear />}
                        style={this.STYLES.radioButton}
                        disabled={this.props.isDisabled}
                        labelStyle={{marginRight: '10px'}}
                        label="Choose side"

                    />
                    <RadioButton
                        value="1"
                        checkedIcon={<RadioButtonUnchecked />}
                        style={this.STYLES.radioButton}
                        disabled={this.props.isDisabled}
                        label="&nbsp;"
                    />
                </RadioButtonGroup>
            </div>

        )
    }
}

