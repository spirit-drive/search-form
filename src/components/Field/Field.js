import React, { Component } from 'react';
import IconClose from "../IconClose/IconClose";
import createComponent from "../../lib/createComponent";
const Field_ = createComponent('field h_1');


class Field extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        }
    }

    componentWillReceiveProps ({value}) {
        this.setState({value});
    }

    reset = e => {
        e.stopPropagation();
        this.props.reset && this.props.reset();
        this.setState({value: ''});
    };

    render () {
        return (
            <Field_ className={this.props.className}>
                <div className="field__wrapper">
                    {this.props.placeholder && <span className="field__placeholder">{this.props.placeholder}</span>}
                    <span className="field__value">{this.state.value}</span>
                </div>
                {this.props.withClose && this.state.value && <div className="field__close-wrapper"><IconClose onClick={this.reset} className="field__close"/></div>}
            </Field_>
        )
    }
}

Field.defaultProps = {
    placeholder: '',
    value: '',
    withClose: true,
};

export default Field;