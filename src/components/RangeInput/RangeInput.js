import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import InputNumber from "../InputNumber/InputNumber";

const RangeInput_ = createComponent('range-input field h_1');

class RangeInput extends Component {

    constructor(props) {
        super (props);

        this.state = {
            values: this._toLimitValues(props.values),
        };

    }

    componentWillReceiveProps({values}) {
        values = this._toLimitValues(values);
        this.setState({values});
    }

    _toLimitValues (values) {
        const {min, max} = this.props;
        const left = values.min > min
            ? values.min < values.max
                ? values.min
                : values.max
            : min;

        const right = values.max < max
            ? values.max > values.min
                ? values.max
                : values.min
            : max;

        return {min: left, max: right};
    }

    onChange = key => value => {
        clearTimeout(this.timeoutId);

        const values = {...this.state.values};
        values[key] = value;
        this.setState({values});

        this.timeoutId = setTimeout(() => this.props.liftUpState(values), 1000);
    };


    render() {
        const {values} = this.state;
        return (
            <RangeInput_>
                <InputNumber onChange={this.onChange('min')} className="range-input__input range-input__input_left" value={values.min}/>
                <span className="range-input__separator">—</span>
                <InputNumber onChange={this.onChange('max')} value={values.max}/>
            </RangeInput_>
        )
    }
}

RangeInput.defaultProps = {
    min: 100,
    max: 1000,
    values: {
        min: 100,
        max: 1000,
    },
    liftUpState: state => console.log('RangeInput', state),
};

export default RangeInput;