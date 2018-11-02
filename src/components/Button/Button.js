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

        let end;
        if (count === 1) {
            end = declinations[0];
        } else if (count > 1 && count < 5) {
            end = declinations[1];
        } else {
            end = declinations[2];
        }

        return end;
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

// Button.defaultProps = {
//     count: undefined
// };

export default Button;
