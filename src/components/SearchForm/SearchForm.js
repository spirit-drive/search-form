import React, { Component } from 'react';
import FormType from "../FormType/FormType";
import FormPrice from "../FormPrice/FormPrice";
import FormMortgage from "../FormMortgage/FormMortgage";
import FormInstallment from "../FormInstallment/FormInstallment";
import search from "../../db/search";


class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
        };

        this.liftResult = this.liftResult.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    liftResult (e) {
        e.preventDefault();
        const _data = {
            type: e.currentTarget.text.value,
            price: {
                min: e.currentTarget.min.value,
                max: e.currentTarget.max.value,
            },
            isMortgage: e.currentTarget.mortgage.checked,
            isInstallment: e.currentTarget.installment.checked,
        };
        const data = search(_data);
        this.props.liftResult(data);
        this.setState({data})
    };

    onChange (value, properties) {
        const data = {...this.state.data};
        data[properties] = value;
        this.setState({data});
    }

    render () {
        console.log(this.state.data);
        return (
            <form onSubmit={this.liftResult}>
                <FormType onChange={this.onChange}/>
                <FormPrice />
                <FormMortgage />
                <FormInstallment />
                <input type="submit" value="Найти"/>
            </form>
        )
    }
}

export default SearchForm;
