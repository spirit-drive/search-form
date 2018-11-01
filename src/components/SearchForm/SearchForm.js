import React, { Component } from 'react';
import FormType from "../FormType/FormType";
import FormPrice from "../FormPrice/FormPrice";
import FormMortgage from "../FormMortgage/FormMortgage";
import FormInstallment from "../FormInstallment/FormInstallment";
import MultiSelect from "../MultiSelect/MultiSelect";
import search from "../../db/search";


class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                type: ["1-комнатная", "Студия"],
                price: {
                    min: 0,
                    max: Infinity,
                },
                mortgage: false,
                isInstallment: false,
            },
        };
    }

    liftUpResult = e => {
        e.preventDefault();

        const data = search(this.state.data);
        this.props.liftUpResult(data);
    };

    onChange = (value, properties) => {
        const data = {...this.state.data};
        data[properties] = value;
        console.log(data);
        this.setState({data});
    };

    _createContent (array) {
        if (!Array.isArray(array)) throw new Error(`${JSON.stringify(array)} должен быть массивом`);
        array.forEach(item => {if (!(item.Component.prototype instanceof Component)) throw new Error(`Все элементы массива должны быть компонентами React`)});

        return array.map((item, i) => (
            <item.Component
                data={this.state.data[item.name]}
                name={item.name}
                key={`SearchForm_Item_urn24f43_${i}`}
                onChange={this.onChange}
            />
        ))
    }

    render () {
        return (
            <form className="search-form" onSubmit={this.liftUpResult}>
                <MultiSelect />
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
                {/*<input type="submit" value="Найти"/>*/}
            </form>
        )
    }
}

export default SearchForm;
