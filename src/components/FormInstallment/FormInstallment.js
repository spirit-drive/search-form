import React, { Component } from 'react';

class FormInstallment extends Component {

    _liftUpValue () {
        this.props.onChange(this.elem.checked, this.props.name);
    }

    _onChange = () => {
        this._liftUpValue();
    };

    render () {
        return (
            <div>
                <span>Рассрочка </span><input onChange={this._onChange} ref={elem => this.elem = elem} type="checkbox"/>
            </div>
        )

    }
}

FormInstallment.defaultProps = {
    name: "installment",
};


export default FormInstallment;