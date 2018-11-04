import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";

const declinations = [
    'Вариант',
    'Варианта',
    'Вариантов',
];

class Button extends Component {

    constructor(props) {
        super(props);

        this.Component = createComponent('button h_1', 'button', {onClick: this.props.onClick});

        this.isUpdate = false;

    }

    componentWillUpdate () {
        this.isUpdate = true;
    }

    _getEnd(count) {

        const dec = Math.floor(count % 100);
        const number = Math.floor(count % 10);

        if (dec >= 11 && dec <= 14) return declinations[2];


        return number === 1
            ? declinations[0]
            : number > 1 && number < 5
                ? declinations[1]
                : declinations[2];

    }

    _getText () {
        const {count} = this.props;

        return this.isUpdate ? `Показать: ${count} ${this._getEnd(count)}` : 'Подобрать'
    }

    render () {
        return (
            <this.Component className={this.props.className}>
                <p>{this._getText()}</p>
            </this.Component>
        )
    }
}

export default Button;
