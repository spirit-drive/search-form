import React, { Component } from 'react';
import MultiSelect from "../MultiSelect/MultiSelect";
import PriceSlider from "../PriceSlider/PriceSlider";
import BigSwitcher from "../BigSwitcher/BigSwitcher";
import Button from "../Button/Button";
import search from "../../../server/db/search";
import {url} from "../../setting";
import createComponent from "../../lib/createComponent";

const Form = createComponent('search-form', 'form', {onSubmit: e => e.preventDefault()});

const listItems = [{
    value: false,
    text: 'Студия',
}, {
    value: false,
    text: '1-комнатная',
}, {
    value: false,
    text: '2-комнатная',
}, {
    value: false,
    text: '3-комнатная',
}, {
    value: false,
    text: '4-комнатная',
}, {
    value: false,
    text: '5-комнатная',
}, {
    value: false,
    text: '6-комнатная',
}];


class SearchForm extends Component {

    constructor(props) {
        super(props);

        // this.search(null, founded => {
        //
        // });
        const founded = search();
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

        this.state = {
            data,
            founded,
        };
    }

    _search = data => new Promise(resolve => {

        const xhr = new XMLHttpRequest();
        xhr.open("post", `${url}/data`, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = () => {
            resolve(xhr.responseText);
        };
        xhr.send("data=" + JSON.stringify(data));
    });

    search(data, func) {
        this._search(data)
            .then(res => JSON.parse(res))
            .then(founded => {
                func(founded);
            });
    }

    liftUpResult = e => {
        e.preventDefault();
        // this.search(this.state.data, founded => {
        //     this.setState({founded});
        //     this.props.liftUpResult(founded);
        // });
        const data = search(this.state.data);
        this.setState({founded: data});
        this.props.liftUpResult(data);
    };

    onChange = (value, properties) => {
        const data = {...this.state.data};
        data[properties] = value;
        // console.log(data);
        // this.search(data, founded => this.setState({data, founded}));


        this.setState({data, founded: search(data)});
    };

    render () {
        const {price} = this.state.data;
        const {max, min} = this.price;
        return (
            <Form className={this.props.className}>
                <div className="search-form__item">
                    <MultiSelect
                        onChange={this.onChange}
                        name="type"
                        placeholder='Кол-во комнат:'
                        items={listItems}
                    />
                </div>
                <div className="search-form__item">
                    <PriceSlider
                        onChange={this.onChange}
                        values={price}
                        min={min}
                        max={max}
                        name="price"
                    />
                </div>
                <div className="search-form__item">
                    <BigSwitcher
                        onChange={this.onChange}
                        data={this.state.data}
                    />
                </div>
                <div className="search-form__item">
                    <Button onClick={this.liftUpResult} count={this.state.founded.length} />
                </div>

            </Form>
        )
    }
}

export default SearchForm;
