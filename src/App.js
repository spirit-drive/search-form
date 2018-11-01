import React, { Component } from 'react';
import SearchForm from "./components/SearchForm/SearchForm";
import ResultSearch from "./components/ResultSearch/ResultSearch";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };

        this.setData = this.setData.bind(this);
    }

    _toPrepareData (data) {
        return JSON.stringify(data, null, "  ");
    }

    setData (data) {
        this.setState({data});
    }

    render () {
        return (
            <div>
                <SearchForm liftUpResult={this.setData}/>
                <ResultSearch data={this.state.data}/>
            </div>
        )
    }
}

export default App;
