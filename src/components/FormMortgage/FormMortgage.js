import React, { Component } from 'react';

class FormMortgage extends Component {
    render () {
        return (
            <div>
                <span>Ипотека </span><input type="checkbox" name="mortgage"/>
            </div>
        )
    }
}

export default FormMortgage