import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import RangeSlider from "../RangeSlider/RangeSlider"
const PriceSlider_ = createComponent('price-slider');

class PriceSlider extends Component {
    render() {
        return (
            <PriceSlider_>
                <RangeSlider/>
            </PriceSlider_>
        )
    }
}

PriceSlider.defaultProps = {

};

export default PriceSlider;