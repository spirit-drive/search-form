import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";

class Switcher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.Component = createComponent('switcher h_1', 'div', {onClick: this._onChange});
    }

    _onChange = () => {
        const value = !this.state.value;
        this.setState({value});
        this.props.liftUpState(value, this.props.name)
    };

    _getClass () {
        const {className} = this.props;
        return `${className ? className : ''}${this.state.value ? `${className ? ' ' : ''}switcher_active` : ''}`;
    }

    render() {
        return <this.Component className={this._getClass()}>{this.props.children}</this.Component>
    }
}

Switcher.defaultProps = {
    value: false,
    liftUpState: state => console.log("Switcher", state),
};


export default Switcher;