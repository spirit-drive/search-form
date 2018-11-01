import React, { Component } from 'react';
import IconClose from "../IconClose/IconClose";

class Field extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        }
    }

    reset = () => this.setState({value: ''});

    render () {
        return (
            <div className="field">
                <div className="field__wrapper">
                    {this.props.placeholder && <span className="field__placeholder">{this.props.placeholder}</span>}
                    <span className="field__value">{this.state.value}</span>
                </div>
                {this.props.withClose && this.state.value && <div className="field__close-wrapper"><IconClose onClick={this.reset} className="field__close"/></div>}
            </div>
        )
    }
}

Field.defaultProps = {
    placeholder: '',
    value: '',
    withClose: true,
};

export default Field;