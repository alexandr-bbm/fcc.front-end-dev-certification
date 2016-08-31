import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as pageActions from '../actions/pageActions'
import Search from '../components/Search'
import SearchResults from '../components/SearchResults'
import ShatteringPopup from '../components/ShatteringPopup'

class App extends Component {

    componentDidMount () {
    }

    render () {
        const data = this.props.page.results;
        const isPopup = this.props.page.isPopup;
        const {getArticles, closePopup} = this.props.pageActions;
        
        const mainTemplate = (
            <div className="center" id="content-02" ref="content">
                <Search getArticles={getArticles} />
                <SearchResults data={data} />
            </div>
        );

        return isPopup ? <ShatteringPopup closePopup={closePopup} /> : mainTemplate;
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