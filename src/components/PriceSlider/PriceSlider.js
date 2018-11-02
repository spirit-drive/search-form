import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import RangeSlider from "../RangeSlider/RangeSlider"
import RangeInput from "../RangeInput/RangeInput"
const PriceSlider_ = createComponent('price-slider');

class PriceSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: this._toLimitValues(this.props.values)
        };

    }

    _toLimitValues (values) {
        const {min, max} = this.props;
        const left = values.left > min
            ? values.left < values.right
                ? values.left
                : values.right
            : min;

        const right = values.right < max
            ? values.right > values.left
                ? values.right
                : values.left
            : max;

        return {left, right};
    }

    _setValues = values => this.setState({values: this._toLimitValues(values)});

    render() {
        const {min, max} = this.props;
        const {values} = this.state;
        return (
            <PriceSlider_>
                <RangeInput min={min} max={max} values={values} liftUpState={this._setValues}/>
                <RangeSlider edges={{left: min, right: max}} values={values} liftUpState={this._setValues}/>
            </PriceSlider_>
        )
    }
}

PriceSlider.defaultProps = {
    min: 100,
    max: 2000,
    values: {
        left: 100,
        right: 550,
    },
    liftUpState: state => console.log('PriceSlider', state),
};

export default PriceSlider;