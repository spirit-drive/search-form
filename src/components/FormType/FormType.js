import React, { Component } from 'react';

class FormType extends Component {

    constructor(props) {
        super(props);

        this.value = this.props.data;
    }

    _liftUpValue () {
        this.props.onChange(this.value, this.props.name);
    }

    _onChange = () => {
        this._liftUpValue();
    };

    render () {
        return (
            <div className="form-type">
                <input ref={elem => this.elem = elem} type="text" onChange={this._onChange} defaultValue={this.props.data}/>
            </div>
        )
    }
}

FormType.defaultProps = {
    name: "type",
};

export default FormType