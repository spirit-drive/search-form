import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
const RangeSlider_ = createComponent('range-slider');

class RangeSlider extends Component {
    render() {
        return (
            <RangeSlider_ className={this.props.className}>
                <div className="range-slider__wrapper">
                    <div className="range-slider__field">
                        <button className="range-slider__runner range-slider__runner_left" />
                        <button className="range-slider__runner range-slider__runner_right" />
                    </div>
                </div>
            </RangeSlider_>
        )
    }
}

RangeSlider.defaultProps = {

};

export default RangeSlider;