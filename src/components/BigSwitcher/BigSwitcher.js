import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
const BigSwitcher_ = createComponent('big-switcher field');
import Switcher from "../Switcher/Switcher";

class BigSwitcher extends Component {
    render () {
        return (
            <BigSwitcher_ className={this.props.className}>
                <Switcher
                    className="big-switcher__children switcher-mortgage"
                    liftUpState={this.props.onChange}
                    value={this.props.data.mortgage}
                    name="mortgage"
                >
                    <p>Ипотека</p>
                </Switcher>
                <Switcher
                    className="big-switcher__children switcher-installment"
                    liftUpState={this.props.onChange}
                    value={this.props.data.isInstallment}
                    name="isInstallment"
                >
                    <p>Рассрочка</p>
                </Switcher>
            </BigSwitcher_>
        )
    }
}

export default BigSwitcher;

