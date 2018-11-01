import React, { Component } from 'react';
import Field from "../Field/Field";

class MultiSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            value: this.props.items,
        }
    }

    _getStringFromValue () {
        return this.state.value.join(', ');
    }

    render () {
        return (
            <div className="multi-select">
                <Field placeholder={this.props.placeholder} value={this._getStringFromValue()}/>
                {/*.multi-select__*/}
                {/*<input ref={elem => this.elem = elem} type="text" onChange={this._onChange} defaultValue={this.props.data}/>*/}
            </div>
        )
    }
}

MultiSelect.defaultProps = {
    placeholder: 'placeholder:',
    items: [
        'value 1',
        'value 2',
        'value 3',
        'value 1',
        'value 2',
        'value 3',
        'value 1',
        'value 2',
        'value 3',
        'value 1',
        'value 2',
        'value 3',
        'value 1',
        'value 2',
        'value 3',
        'value 1',
        'value 2',
        'value 3',
        'value 1',
        'value 2',
        'value 3',
    ]
};

export default MultiSelect;