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

    _getMouseLeft = e => {
        const position = e.pageX - this.left;
        this._setValue(position);
    };

    _addWatchLeft () {
        document.addEventListener('mousemove', this._getMouseLeft);
    }

    _removeWatchLeft () {
        document.removeEventListener('mousemove', this._getMouseLeft);
    }

    _closeWatchLeft = () => {
        this._removeWatchLeft();
        this._removeCloseWatchLeft();
    };

    _addCloseWatchLeft () {
        document.addEventListener('mouseup', this._closeWatchLeft);
    }

    _removeCloseWatchLeft () {
        document.removeEventListener('mouseup', this._closeWatchLeft);
    }

}

class RangeSlider extends SliderBasis {

    constructor(props) {
        super(props);

        this.state = {
            values: this._toLimitValues()
        };

    }

    _toLimitValues () {
        const {values, edges} = this.props;
        const left = values.left > edges.left
            ? values.left < edges.right
                ? values.left
                : edges.right
            : edges.left;

        const right = values.right < edges.right
            ? values.right > edges.left
                ? values.right
                : edges.left
            : edges.right;

        return {left, right};
    }

    _getSizeRange () {
        const {right, left} = this.props.edges;
        return right - left;
    }

    _getPosition (value) {
        const shift = value - this.props.edges.left;
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
        let {left, right} = values;
        this.props.liftUpState({
            left: Math.round(left),
            right: Math.round(right)
        });
    }

    _getValue (position) {
        return this._getPositionInPercent(position) * this._getSizeRange() + this.props.edges.left;
    }

    _setValue (position) {
        const value = this._getValue(position);
        const {left, right} = this.state.values;
        const dL = value - left;
        const dR = right - value;
        const values = {...this.state.values};

        values[dR > dL ? 'left' : 'right'] = value;
        this._liftUpState(values);
        this.setState({values});
    }

    _getWidth (left, right) {
        const d = right - left;
        const {left: _left, right: _right} = this.props.edges;
        const size = _right - _left;
        return d / size * 100;
    }

    _setPositionRange (_left, right) {
        const left = this._getPosition(_left);
        return {
            left: this._toWrapInPercent(left),
            width: this._toWrapInPercent(this._getWidth(_left, right))
        }
    }


    render() {
        const {left, right} = this.state.values;
        return (
            <RangeSlider_ className={this.props.className}>
                <div className="range-slider__wrapper">
                    <div
                        ref={elem => this.field = elem}
                        className="range-slider__field"
                        onMouseDown={this._moveRunner}
                    >
                        <div style={this._setPositionRange(left, right)} className="range-slider__range"/>
                        <button style={this._setPosition(left)} className="range-slider__runner range-slider__runner_left" />
                        <button style={this._setPosition(right)} className="range-slider__runner range-slider__runner_right" />
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
        left: 10,
        right: 100,
    },
    values: {
        left: 0,
        right: 55,
    },
    liftUpState: state => console.log('RangeSlider', state),
};

export default RangeSlider;