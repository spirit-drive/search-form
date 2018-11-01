import React, { Component } from 'react';

class FormPrice extends Component {

    _liftUpValue () {
        this.props.onChange({
            min: this.min.value,
            max: this.max.value,
        }, this.props.name);
    }

    _onChange = () => {
        this._liftUpValue();
    };

    render () {
        return (
            <div>
                <input onChange={this._onChange} ref={elem => this.min = elem} type="text" name="min"/>
                <input onChange={this._onChange} ref={elem => this.max = elem} type="text" name="max"/>
            </div>
        )
    }
}

FormPrice.defaultProps = {
    name: "price",
};


export default FormPrice;
