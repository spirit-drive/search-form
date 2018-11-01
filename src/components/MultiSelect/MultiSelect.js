import React, { Component } from 'react';
import Field from "../Field/Field";
import ListCheckboxes from "../ListCheckboxes/ListCheckboxes";
import createComponent from "../../lib/createComponent";
const MultiSelect_ = createComponent('multi-select');


class MultiSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            value: this.props.items,
        }
    }

    _getArrayText = array => array.filter(item => item.value).map(item => item.text);

    _getStringFromValue () {
        return this._getArrayText(this.state.value).join(', ');
    }

    _change(value) {
        this.props.onChange && this.props.onChange(this._getArrayText(value), this.props.name);
    }

    changeValue = value => {
        this._change(value);
        this.setState({value});
    };

    _showOrHideList = e => {
        e.stopPropagation();
        const isOpen = !this.state.isOpen;
        this.setState({isOpen});
    };

    _hideList = () => this.setState({isOpen: false});

    _cancelHide = e => e.stopPropagation();

    componentDidMount () {
        window.addEventListener('click', this._hideList);
    }

    componentWillUnmount () {
        window.removeEventListener('click', this._hideList);
    }

    reset = () => {
        const value = this.state.value.map(item => ({value: false, text: item.text}));
        this._change(value);
        this.setState({value, isOpen: false});
    };


    render () {
        return (
            <MultiSelect_ className={this.props.className}>
                <div onClick={this._cancelHide}>
                    <div onClick={this._showOrHideList}>
                        <Field
                            reset={this.reset}
                            placeholder={this.props.placeholder}
                            value={this._getStringFromValue()}
                        />
                    </div>
                    {this.state.isOpen &&
                    <ListCheckboxes
                        liftUpState={this.changeValue}
                        className="multi-select__list-checkboxes"
                        items={this.state.value}
                    />}
                </div>
            </MultiSelect_>
        )
    }
}

MultiSelect.defaultProps = {
    placeholder: 'placeholder',
    items: [{
        value: false,
        text: 'value 1',
    }, {
        value: false,
        text: 'value 2',
    }, {
        value: false,
        text: 'value 3',
    }]
};

export default MultiSelect;