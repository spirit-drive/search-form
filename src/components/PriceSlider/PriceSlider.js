import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import RangeSlider from "../RangeSlider/RangeSlider"
const PriceSlider_ = createComponent('price-slider');

class PriceSlider extends Component {
    render() {
        const {min, max, values} = this.props;
        return (
            <PriceSlider_>
                <RangeSlider edges={{left: min, right: max}} values={values}/>
            </PriceSlider_>
        )
    }
}

PriceSlider.defaultProps = {
    min: 100,
    max: 1000,
    values: {
        left: 100,
        right: 550,
    },
    liftUpState: state => console.log('PriceSlider', state),
};

export default PriceSlider;