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
            data: [],
        };

    }

    liftResult () {
        return e => {
            e.preventDefault();
            const data = {
                type: e.currentTarget.text.value,
            };
            this.props.liftResult(search(data));
        }
    }

    render () {
        return (
            <form onSubmit={this.liftResult()}>
                <FormType />
                <FormPrice />
                <FormMortgage />
                <FormInstallment />
                <input type="submit" value="Найти"/>
            </form>
        )
    }
}

export default SearchForm;
