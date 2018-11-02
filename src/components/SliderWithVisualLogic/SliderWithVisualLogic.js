import React from 'react';
import SliderBasis from '../SliderBasis/SliderBasis';
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

    _setPositionRunner (value) {
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

export default SliderWithVisualLogic;
