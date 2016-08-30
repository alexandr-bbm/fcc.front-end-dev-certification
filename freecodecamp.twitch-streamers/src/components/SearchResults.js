import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class SearchResults extends Component {

    render () {
        const items = this.props.data.map((item, idx) => {
            if (item.status === false) {
                return (
                    <div className="search-result" key={idx}>
                        <div className="search-result__title">{item.name}</div>
                        <div className="search-result__status">{item.message}</div>
                    </div>
                )
            } else {
                const statusClass = `search-result__status search-result__status_${item.status}`;
                return (
                    <a className="search-result" href={item.url} target="_blank" key={idx}>
                        <div className="search-result__title">{item.name}</div>
                        <img src={item.logo} className="search-result__logo" alt="" />
                        <div className={statusClass}>
                            {item.status}
                        </div>
                        <div className="search-result__game">{item.game}</div>
                    </a>
                )
            }
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