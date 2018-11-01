import React, { Component } from 'react';

class FormMortgage extends Component {

    _liftUpValue () {
        this.props.onChange(this.elem.checked, this.props.name);
    }

    _onChange = () => {
        this._liftUpValue();
    };

    render () {
        return (
            <div>
                <span>Ипотека </span><input onChange={this._onChange} ref={elem => this.elem = elem} type="checkbox"/>
            </div>
        )
    }
}

FormMortgage.defaultProps = {
    name: "mortgage",
};


export default FormMortgage