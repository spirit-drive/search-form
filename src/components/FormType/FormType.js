import React, { Component } from 'react';

class FormType extends Component {
    constructor(props) {
        super(props);

        this.name = "type";
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e){

    };
    render () {
        // return <input type="text" defaultValue="3-комнатная" name="text"/>
        return <input type="text" onChange={this._onChange} defaultValue="3-комнатная" name={this.name}/>
    }
}

export default FormType