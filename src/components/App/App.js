import React, { Component } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import ResultSearch from "../ResultSearch/ResultSearch";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };

    }

    setData = data => this.setState({data});

    render () {
        return (
            <div className="app">
                <h1 className="app__title">Купить квартиру</h1>
                <SearchForm liftUpResult={this.setData}/>
                <ResultSearch data={this.state.data}/>
            </div>
        )
    }
}

export default App;
