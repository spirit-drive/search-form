import React, { Component } from 'react';

class FormType extends Component {

    _liftUpValue () {
        this.props.onChange(this.elem.value, this.props.name);
    }

    _onChange = () => {
        this._liftUpValue();
    };

    render () {
        return <input ref={elem => this.elem = elem} type="text" onChange={this._onChange} defaultValue="3-комнатная"/>
    }
}

FormType.defaultProps = {
    name: "type",
};

export default FormType