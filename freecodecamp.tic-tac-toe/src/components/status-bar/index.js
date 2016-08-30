import React from 'react';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvStop from 'material-ui/svg-icons/av/stop';
import RaisedButton from 'material-ui/RaisedButton';

export default class StatusBar extends React.Component {
    STYLES = {
    };

    render () {
        const {isRunning} = this.props;
        const playOrStopBtn = isRunning ?
            <RaisedButton
                label="Stop game"
                icon={<AvStop />}
                onClick={this.props.onStopClick}
            /> :
            <RaisedButton
                label="Start game"
                icon={<AvPlayArrow />}
                onClick={this.props.onPlayClick}
            />;
        return playOrStopBtn;
    }
}

