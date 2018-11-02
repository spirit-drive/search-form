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

    componentWillReceiveProps({values}) {
        values = this._toLimitValues(values);
        this.setState({values});
    }


    _toLimitValues (values) {
        const {min, max} = this.props;
        let left, right;
        if (values) {
            left = values.min > min
                ? values.min < values.max
                    ? values.min
                    : values.max
                : min;

            right = values.max < max
                ? values.max > values.min
                    ? values.max
                    : values.min
                : max;
        } else {
            left = min;
            right = max;
        }

        return {min: left, max: right};
    }

    _setValues = values => {
        values = this._toLimitValues(values);
        this.setState({values});
        this.props.liftUpState(values);
    };

    render() {
        const {min, max} = this.props;
        const {values} = this.state;
        return (
            <PriceSlider_>
                <RangeInput min={min} max={max} values={values} liftUpState={this._setValues}/>
                <RangeSlider min={min} max={max} values={values} liftUpState={this._setValues}/>
            </PriceSlider_>
        )
    }
}

PriceSlider.defaultProps = {
    min: 100,
    max: 2000,
    liftUpState: state => console.log('PriceSlider', state),
};

export default PriceSlider;