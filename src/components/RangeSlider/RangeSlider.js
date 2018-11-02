import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import getPosition from "../../lib/getPosition";
const RangeSlider_ = createComponent('range-slider');

class RangeSlider extends Component {

    constructor(props) {
        super(props);
    }

    _setLeft () {

    }

    moveRunner = e => {

    };

    render() {
        return (
            <RangeSlider_ className={this.props.className}>
                <div className="range-slider__wrapper">
                    <div ref={elem => this.field = elem} className="range-slider__field">
                        <div className="range-slider__range"/>
                        <button className="range-slider__runner range-slider__runner_left" />
                        <button className="range-slider__runner range-slider__runner_right" />
                    </div>
                </div>
                <div className="range-slider__marks">
                    <span className="range-slider__mark range-slider__mark_left">{this.props.edges.left}</span>
                    <span className="range-slider__mark range-slider__mark_right">{this.props.edges.right}</span>
                </div>
            </RangeSlider_>
        )
    }
}

RangeSlider.defaultProps = {
    edges: {
        left: 0,
        right: 1000,
    },
    values: {
        left: 10,
        right: 100,
    },
    liftUpState: state => console.log(state),
};

export default RangeSlider;