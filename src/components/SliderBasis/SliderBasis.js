import React, { Component } from 'react';
import getPosition from "../../lib/getPosition";

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

    _getMouseLeft = e => {
        let pageX;
        if ('changedTouches' in e) {
            pageX = e.changedTouches[0].pageX;
        } else {
            pageX = e.pageX;
        }
        this._getValueFromPageX(pageX);
    };

    _addWatchLeft () {
        document.addEventListener('mousemove', this._getMouseLeft);
        document.addEventListener('touchmove', this._getMouseLeft);
    }

    _removeWatchLeft () {
        document.removeEventListener('mousemove', this._getMouseLeft);
        document.removeEventListener('touchmove', this._getMouseLeft);
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

export default SliderBasis;