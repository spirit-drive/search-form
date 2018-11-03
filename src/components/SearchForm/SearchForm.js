import React, { Component } from 'react';
import MultiSelect from "../MultiSelect/MultiSelect";
import PriceSlider from "../PriceSlider/PriceSlider";
import BigSwitcher from "../BigSwitcher/BigSwitcher";
import Button from "../Button/Button";
import {url, listItems} from "../../setting";
import {Promise} from 'es6-promise-polyfill';
import createComponent from "../../lib/createComponent";

const SearchForm_ = createComponent('search-form', 'form', {onSubmit: e => e.preventDefault()});

class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: false,
            founded: false,
        };

    }

    componentWillMount () {
        this.search(null, founded => {
            const prices = founded.map(item => item.price);
            this.price = {
                min: Math.min(...prices),
                max: Math.max(...prices),
            };

            const data = {
                type: [],
                price: null,
                mortgage: false,
                installment: false,
            };

            data.price = this.price;

            this.setState({data, founded});
        });
    }

    _search = data => new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open("post", `${url}/data`, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = reject;
        xhr.send("data=" + JSON.stringify(data));
    });

    search(data, func) {
        this._search(data)
            .then(res => JSON.parse(res))
            .then(founded => func(founded))
            .catch(console.error);
    }

    liftUpResult = e => {
        e.preventDefault();
        this.search(this.state.data, founded => {
            this.setState({founded});
            this.props.liftUpResult(founded);
        });
    };

    onChange = (value, properties) => {
        const data = {...this.state.data};
        data[properties] = value;
        this.search(data, founded => this.setState({data, founded}));
    };

    render () {

        if (this.state.data) {
            const {price} = this.state.data;
            const {max, min} = this.price;
            const step = (max - min) / 1000;
            const acceleration = 10;
            return (
                <SearchForm_ className={this.props.className}>
                    <MultiSelect
                        className="search-form__item"
                        onChange={this.onChange}
                        name="type"
                        placeholder='Кол-во комнат:'
                        items={listItems}
                    />
                    <PriceSlider
                        className="search-form__item"
                        onChange={this.onChange}
                        values={price}
                        step={step}
                        acceleration={acceleration}
                        min={min}
                        max={max}
                        name="price"
                    />
                    <BigSwitcher
                        className="search-form__item"
                        onChange={this.onChange}
                        data={this.state.data}
                    />
                    <Button className="search-form__item" onClick={this.liftUpResult} count={this.state.founded.length}/>

                </SearchForm_>
            );
        }

        return null;
    }
}

export default SearchForm;
