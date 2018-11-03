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

    onFocusRunner = type => e => {
        e.preventDefault();
        this._windowKeyDown = this._moveRunnerWithArrow(type);
        this._addWindowKeyDown(this._windowKeyDown);
        this._addWindowKeyUp();
    };

    onBlurRunner = e => {
        e.preventDefault();
        this._removeWindowKeyDown(this._windowKeyDown);
        this._removeWindowKeyUp();
    };

    _moveRunnerWithArrowInside = (type, vector = 1) => {
        const {step, min, max, acceleration} = this.props;
        const k = this._isShift ? acceleration : 1;
        let values = {...this.state.values};
        values[type] = Math.round(values[type]) + vector * step * k;
        values = this._toLimitValues({min, max, values});
        this.setState({values});
        this._liftUpState(values);
    };

    _moveRunnerWithArrow = type => e => {
        if (e.keyCode === 16) this._isShift = true;
        switch (e.keyCode) {
            case 39:
                this._moveRunnerWithArrowInside(type);
                break;

            case 37:
                this._moveRunnerWithArrowInside(type, -1);
                break;


        }
    };


    _addWindowKeyDown (func) {
        window.addEventListener('keydown', func);
    }

    _removeWindowKeyDown (func) {
        window.removeEventListener('keydown', func);
    }

    _resetCombinationKey = () => {
        this._isShift = false;
    };

    _addWindowKeyUp () {
        window.addEventListener('keyup', this._resetCombinationKey);
    }

    _removeWindowKeyUp () {
        window.removeEventListener('keyup', this._resetCombinationKey);
    }

}

export default SliderWithVisualLogic;
