import React, { Component } from 'react';
import SearchForm from "./components/SearchForm/SearchForm";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: "",
        };

        this.setData = this.setData.bind(this);
    }

    _toPrepareData (data) {
        return JSON.stringify(data, null, "  ");
    }

    setData (data) {
        data = this._toPrepareData(data);
        console.log(data);
        this.setState({data});
    }

    render () {
        return (
            <div>
                <SearchForm showResult={this.setData}/>
                <div>{this.state.data}</div>
            </div>
        )
    }
}

export default App;
