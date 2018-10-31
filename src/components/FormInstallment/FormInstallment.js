import React, { Component } from 'react';

class FormInstallment extends Component {
    render () {
        return (
            <div>
                <span>Рассрочка </span><input type="checkbox" name="installment"/>
            </div>
        )

    }
}

export default FormInstallment;