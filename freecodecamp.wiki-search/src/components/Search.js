import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom';

export default class Search extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        const value = ReactDOM.findDOMNode(this.refs.searchInput).value;
        console.log(`${value} submited!`);
        this.props.getArticles(value);
    };

    componentDidMount() {
        setTimeout(this.refs.searchInput.focus, 0);
    }

    render () {
        return (
            <form action="" className="search-form" onSubmit={this.onSubmit}>
                <input autoFocus type="text"
                       className="search-form__input"
                       placeholder="Search here ..."
                       ref="searchInput"
                       defaultValue=""
                />
                <div className="search-form__icon search-form__icon_search" onClick={this.onSubmit}></div>
                <a className="search-form__icon search-form__icon_random" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank"></a>
            </form>
        )
    }
}