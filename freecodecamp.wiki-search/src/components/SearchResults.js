import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class SearchResults extends Component {

    render () {
        const items = this.props.data.map((item, idx) => {
            return (
                <SearchResult title={item.title} content={item.content} url={item.url} key={idx} />
            )
        });
        return (
            <div className="search-results">
                <ReactCSSTransitionGroup transitionName="search-result" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {items}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

class SearchResult extends Component {
    render () {
        return (
            <a className="search-result" href={this.props.url} target="_blank">
                <div className="search-result__title">{this.props.title}</div>
                <div className="search-result__content">{this.props.content}</div>
            </a>
        )
    }

}