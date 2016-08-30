import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as pageActions from '../actions/PageActions'
import SearchResults from '../components/SearchResults'
import RadioGroup from '../components/RadioGroup'

class App extends Component {

    componentDidMount () {
        this.props.pageActions.getStreamers();
    }

    render () {
        const streamers = this.props.page.displayStreamers;
        const filterButtons = [
            {
                text: 'All',
                checked: true,
                value: 'all'
            },
            {
                text: 'Online',
                value: 'online'
            },
            {
                text: 'Offline',
                value: 'offline'
            }
        ];
        const { filterStreamers } = this.props.pageActions;
        const mainTemplate = (
            <div className="center" id="content-02" ref="content">
                <div className="page-title">Twitch streamers</div>
                <RadioGroup fieldsName="filter-switcher" buttons={filterButtons} filterFunc={filterStreamers} />
                <SearchResults data={streamers} />
            </div>
        );

        return mainTemplate;
    }
}
function mapStateToProps (state) {
    return {
        user: state.user,
        page: state.page
    }
}

function mapDispatchToProps (dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)