import React, { Component } from 'react';
import db from "../../db";

class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: db,
        };

    }

    liftResult (data) {
        return e => {
            e.preventDefault();
            this.props.showResult(data);
        }
    }

    render () {
        return (
            <form onSubmit={this.liftResult(this.state.data)}>
                <input type="submit" value="Найти"/>
            </form>
        )
    }
}

export default SearchForm;
