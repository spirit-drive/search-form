import React, { Component } from 'react';
import getBeautifulNumber from '../../lib/getBeautifulNumber';

class InputNumber extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: this._getBeautifulValue(this.props.value)
        }

    }

    componentWillReceiveProps({value}) {
        value = this._getBeautifulValue(value);
        this.setState({value});
    }


    _getClass () {
        return `input-number${this.props.className ? ` ${this.props.className}` : ''}`
    }

    _getBeautifulValue (value) {
        return value === '' ? '' : getBeautifulNumber(value);
    }

    _getNumber (value) {
        return +value.replace(/[^\d]/g, '');
    }

    _onChange = e => {
        const value = this._getBeautifulValue(e.currentTarget.value.replace(/[^\d]/g, ''));
        this.setState({value});
        this.props.onChange(this._getNumber(value));
    };

    render() {
        return (
            <input
                onChange={this._onChange}
                className={this._getClass()}
                type="text"
                value={this.state.value}
            />
        )
    }
}

InputNumber.defaultProps = {
    value: '',
    onChange: state => console.log('InputNumber', state),
};

export default InputNumber;