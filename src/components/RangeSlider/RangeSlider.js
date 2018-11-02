import React, { Component } from 'react';
import createComponent from "../../lib/createComponent";
import getPosition from "../../lib/getPosition";
const RangeSlider_ = createComponent('range-slider');

class SliderBasis extends Component {
    componentDidMount () {
        this._setLeft();
        this._addHandlerWindow();
    }

    componentWillUnmount () {
        this._removeHandlerWindow();
    }

    _addHandlerWindow () {
        window.addEventListener('resize', this._setLeft)
    }

    _removeHandlerWindow () {
        window.removeEventListener('resize', this._setLeft)
    }

    _setLeft = () => this.left = getPosition(this.field).x;

    _moveRunner = e => {
        this._getMouseLeft(e);
        this._addWatchLeft();
        this._addCloseWatchLeft();
    };

    _getValueFromPageX (pageX) {
        const position = pageX - this.left;
        this._setValue(position);
    }

    _getMouseLeft = e => this._getValueFromPageX(e.pageX);

    _getTouchLeft = e => this._getValueFromPageX(e.changedTouches[0].pageX);

    _addWatchLeft () {
        document.addEventListener('mousemove', this._getMouseLeft);
        document.addEventListener('touchmove', this._getTouchLeft);
    }

    _removeWatchLeft () {
        document.removeEventListener('mousemove', this._getMouseLeft);
        document.removeEventListener('touchmove', this._getTouchLeft);
    }

    _closeWatchLeft = () => {
        this._removeWatchLeft();
        this._removeCloseWatchLeft();
    };

    _addCloseWatchLeft () {
        document.addEventListener('mouseup', this._closeWatchLeft);
        document.addEventListener('touchend', this._closeWatchLeft);
    }

    _removeCloseWatchLeft () {
        document.removeEventListener('mouseup', this._closeWatchLeft);
        document.removeEventListener('touchend', this._closeWatchLeft);
    }

}

class SliderWithVisualLogic extends SliderBasis {
    _getSizeRange () {
        const {max, min} = this.props;
        return max - min;
    }

    _getPosition (value) {
        const shift = value - this.props.min;
        return shift / this._getSizeRange() * 100;
    }

    _toWrapInPercent (value) {
        return `${value}%`
    }

    _setPosition (value) {
        const left = this._toWrapInPercent(this._getPosition(value));
        return {left}
    }

    _toLimit (value, max = 1, min = 0) {
        return value > max
            ? max
            : value < min
                ? min
                : value;
    }

    _getPositionInPercent (position) {
        const width = parseFloat(getComputedStyle(this.field).width);
        return this._toLimit(position / width);
    }

    _liftUpState (values) {
        let {min, max} = values;
        this.props.liftUpState({
            min: Math.round(min),
            max: Math.round(max)
        });
    }

    _getValue (position) {
        return this._getPositionInPercent(position) * this._getSizeRange() + this.props.min;
    }

    _setValue (position) {
        const value = this._getValue(position);
        const {min, max} = this.state.values;
        const dL = value - min;
        const dR = max - value;
        const values = {...this.state.values};

        values[dR > dL ? 'min' : 'max'] = value;
        this._liftUpState(values);
        this.setState({values});
    }

    _getWidth (left, right) {
        const d = right - left;
        const {min, max} = this.props;
        const size = max - min;
        return d / size * 100;
    }

    _setPositionRange (_left, right) {
        const left = this._getPosition(_left);
        return {
            left: this._toWrapInPercent(left),
            width: this._toWrapInPercent(this._getWidth(_left, right))
        }
    }
}

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

    _getBeautifulValue (value) {
        return Number(value).toLocaleString('ru-Ru', {useGrouping: true});
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
                        <div style={this._setPosition(left)} className="range-slider__runner range-slider__runner_left" />
                        <div style={this._setPosition(right)} className="range-slider__runner range-slider__runner_right" />
                    </div>
                </div>
                <div className="range-slider__marks">
                    <span className="range-slider__mark range-slider__mark_left">{this._getBeautifulValue(min)}</span>
                    <span className="range-slider__mark range-slider__mark_right">{this._getBeautifulValue(max)}</span>
                </div>
            </RangeSlider_>
        )
    }
}

RangeSlider.defaultProps = {
    min: 10,
    max: 100,
    values: {
        min: 0,
        max: 55,
    },
    liftUpState: state => console.log('RangeSlider', state),
};

export default RangeSlider;