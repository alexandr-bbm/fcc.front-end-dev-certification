import React, { PropTypes, Component } from 'react';

export default class RadioGroup extends Component {

    onChangeHandler = (e) => {
        this.props.filterFunc('status', e.target.getAttribute('value'));
    }

    render () {
        const radioGroupName = this.props.fieldsName,
            wrapperClassName = this.props.wrapperClassName ? this.props.wrapperClassName : this.props.fieldsName,
            itemClassName = `${wrapperClassName}__btn`;

        const template = this.props.buttons.map((btn, idx) => {
            const id = btn.id ? btn.id : idx,
                  isChecked = btn.checked ? btn.checked : false;
            return (
                <span className={ itemClassName } key={ idx }>
                    <input type="radio" 
                           id={ id }
                           name={ radioGroupName } 
                           defaultChecked={ isChecked } 
                           value={ btn.value }
                           onChange={this.onChangeHandler}
                    />
                    <label htmlFor={ id }>{ btn.text }</label>
                </span>
            )
        });
        return (
            <div className={ wrapperClassName }>
                { template }
            </div>
        )
    }
}