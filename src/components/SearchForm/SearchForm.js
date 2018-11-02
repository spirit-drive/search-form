import React, { Component } from 'react';
import FormType from "../FormType/FormType";
import FormPrice from "../FormPrice/FormPrice";
import FormMortgage from "../FormMortgage/FormMortgage";
import FormInstallment from "../FormInstallment/FormInstallment";
import MultiSelect from "../MultiSelect/MultiSelect";
import PriceSlider from "../PriceSlider/PriceSlider";
import BigSwitcher from "../BigSwitcher/BigSwitcher";
import Button from "../Button/Button";
import search from "../../db/search";

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

        this.state = {
            data: {
                type: [],
                price: {
                    min: 0,
                    max: Infinity,
                },
                mortgage: false,
                installment: false,
            },
            founded: []
        };
    }

    liftUpResult = e => {
        e.preventDefault();
        const data = search(this.state.data);
        this.setState({founded: data});
        this.props.liftUpResult(data);
    };

    onChange = (value, properties) => {
        const data = {...this.state.data};
        data[properties] = value;
        console.log(data);
        this.setState({data, founded: search(data)});
    };

    // _createContent (array) {
    //     if (!Array.isArray(array)) throw new Error(`${JSON.stringify(array)} должен быть массивом`);
    //     array.forEach(item => {if (!(item.Component.prototype instanceof Component)) throw new Error(`Все элементы массива должны быть компонентами React`)});
    //
    //     return array.map((item, i) => (
    //         <item.Component
    //             data={this.state.data[item.name]}
    //             name={item.name}
    //             key={`SearchForm_Item_urn24f43_${i}`}
    //             onChange={this.onChange}
    //         />
    //     ))
    // }

    render () {
        return (
            <form className="search-form">
                <MultiSelect
                    onChange={this.onChange}
                    name="type"
                    placeholder='Кол-во комнат:'
                    items={listItems}
                />
                <BigSwitcher
                    onChange={this.onChange}
                    data={this.state.data}
                />

                {/*<PriceSlider />*/}
                {/*{this._createContent([{*/}
                    {/*Component: FormType,*/}
                    {/*name: 'type'*/}
                {/*}, {*/}
                    {/*Component: FormPrice,*/}
                    {/*name: 'price'*/}
                {/*}, {*/}
                    {/*Component: FormMortgage,*/}
                    {/*name: 'mortgage'*/}
                {/*}, {*/}
                    {/*Component: FormInstallment,*/}
                    {/*name: 'installment'*/}
                {/*}])}*/}
                <Button onClick={this.liftUpResult} count={this.state.founded.length} />
            </form>
        )
    }
}

export default SearchForm;
