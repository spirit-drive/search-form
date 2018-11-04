import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
const BigSwitcher_ = createComponent('big-switcher field');
import Switcher from "../Switcher/Switcher";

class BigSwitcher extends Component {
    render () {
        return (
            <BigSwitcher_ className={this.props.className}>
                {this.props.switchers.map((item, i) => (
                    <Switcher
                        key={`BigSwitcher_Switcher_rj38f3_${i}`}
                        className={`big-switcher__children switcher-${item.name}`}
                        liftUpState={this.props.onChange}
                        value={this.props.data[item.name]}
                        name={item.name}
                    >
                        <p>{item.text}</p>
                    </Switcher>
                ))}
            </BigSwitcher_>
        )
    }
}

export default BigSwitcher;

