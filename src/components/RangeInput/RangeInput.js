import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import InputNumber from "../InputNumber/InputNumber";

const RangeInput_ = createComponent('range-input field h_1');

class RangeInput extends Component {
    render() {
        const {min, max, values} = this.props;
        return (
            <RangeInput_>
                <InputNumber className="range-input__input range-input__input_left" value={this.props.values.left}/>
                <span className="range-input__separator">—</span>
                <InputNumber value={this.props.values.right}/>
            </RangeInput_>
        )
    }
}

RangeInput.defaultProps = {
    min: 100,
    max: 1000,
    values: {
        left: 100,
        right: 550,
    },
    liftUpState: state => console.log('RangeInput', state),
};

export default RangeInput;