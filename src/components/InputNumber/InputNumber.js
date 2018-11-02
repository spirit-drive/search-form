import React, { Component } from 'react';

class InputNumber extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }

    }

    _getClass () {
        return `input-number${this.props.className ? ` ${this.props.className}` : ''}`
    }

    _getBeautifulValue (value) {
        return value === '' ? '' : Number(value).toLocaleString('ru-Ru', {useGrouping: true});
    }

    _onChange = e => {
        const value = this._getBeautifulValue(e.currentTarget.value.replace(/[^\d]/g, ''));
        this.setState({value});
        this.props.liftUpState(value);
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
    liftUpState: state => console.log('InputNumber', state),
};

export default InputNumber;