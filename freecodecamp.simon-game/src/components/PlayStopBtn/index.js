import React from 'react';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvStop from 'material-ui/svg-icons/av/stop';
import RaisedButton from 'material-ui/RaisedButton';

import './style.scss';

/**
 *  Displays `play` or `stop` btn dependent on `isRunning` property.
 */
export default class PlayStopBtn extends React.Component {

    static propTypes = {
        isRunning: React.PropTypes.bool.isRequired,
        onPlayClick: React.PropTypes.func.isRequired,
        onStopClick: React.PropTypes.func.isRequired,
    };

    render () {
        const {isRunning, onStopClick, onPlayClick} = this.props;
        const className = 'play-stop-btn';

        return isRunning ?
            <RaisedButton
                label="Stop game"
                icon={<AvStop />}
                onClick={onStopClick}
                className={className}
            /> :
            <RaisedButton
                label="Start game"
                icon={<AvPlayArrow />}
                onClick={onPlayClick}
                className={className}
            />;
    }
}

