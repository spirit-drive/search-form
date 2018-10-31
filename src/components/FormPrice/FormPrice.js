import React, { Component } from 'react';

class FormPrice extends Component {
    render () {
        return (
            <div>
                <input type="text" name="min"/>
                <input type="text" name="max"/>
            </div>
        )
    }
}

export default FormPrice;
