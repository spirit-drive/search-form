import React  from 'react';
import createComponent from "../../lib/createComponent";
import getBeautifulNumber from "../../lib/getBeautifulNumber";
import SliderWithVisualLogic from '../SliderWithVisualLogic/SliderWithVisualLogic';
const RangeSlider_ = createComponent('range-slider');

class RangeSlider extends SliderWithVisualLogic {

    constructor(props) {
        super(props);

        this.state = {
            values: this._toLimitValues(props)
        };

    }

    componentWillReceiveProps(props) {
        const values = this._toLimitValues(props);
        this.setState({values});
    }


    _toLimitValues (props) {
        const {values, min, max} = props;
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

    render() {
        const {min: left, max: right} = this.state.values;
        const {min, max} = this.props;
        return (
            <RangeSlider_ className={this.props.className}>
                <div className="range-slider__wrapper">
                    <div
                        ref={elem => this.field = elem}
                        className="range-slider__field"
                        onMouseDown={this._moveRunner}
                        onTouchStart={this._moveRunner}
                    >
                        <div style={this._setPositionRange(left, right)} className="range-slider__range"/>
                        <button
                            onFocus={this.onFocusRunner('min')}
                            onBlur={this.onBlurRunner}
                            style={this._setPositionRunner(left)}
                            className="range-slider__runner range-slider__runner_left"
                        />
                        <button
                            onFocus={this.onFocusRunner('max')}
                            onBlur={this.onBlurRunner}
                            style={this._setPositionRunner(right)}
                            className="range-slider__runner range-slider__runner_right"
                        />
                    </div>
                </div>
                <div className="range-slider__marks">
                    <span className="range-slider__mark range-slider__mark_left">{getBeautifulNumber(min)}</span>
                    <span className="range-slider__mark range-slider__mark_right">{getBeautifulNumber(max)}</span>
                </div>
            </RangeSlider_>
        )
    }
}

RangeSlider.defaultProps = {
    acceleration: 10,
    step: 1000,
    min: 10,
    max: 100,
    values: {
        min: 0,
        max: 55,
    },
    liftUpState: state => console.log('RangeSlider', state),
};

export default RangeSlider;