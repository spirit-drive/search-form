import React, { Component } from 'react';
import Checkbox from "../Checkbox/Checkbox"
import createComponent from "../../lib/createComponent"
const ListCheckboxes_ = createComponent('list-checkboxes', 'ul');

class ListCheckboxes extends Component {

    _liftUpState = i => state => {
        const items = [...this.props.items];
        items[i] = state;
        this.props.liftUpState(items);
    };

    render() {
        return (
            <ListCheckboxes_ className={this.props.className}>
                {this.props.items.map((item, i) => {
                    return (
                        <li
                            key={`ListCheckboxes_li_df22c4_${i}`}
                            className="list-checkboxes__item"
                        >
                            <Checkbox
                                className="list-checkboxes__checkbox"
                                liftUpState={this._liftUpState(i)}
                                valueToTheLeft={false}
                                text={item.text}
                                value={item.value}
                            />
                        </li>
                    )
                })}
            </ListCheckboxes_>
        )
    }
}

ListCheckboxes.defaultProps = {
    items: [{
        value: false,
        text: 'value 1',
    }, {
        value: false,
        text: 'value 2',
    }, {
        value: false,
        text: 'value 3',
    }],
    liftUpState: state => console.log("ListCheckboxes", state),
};

export default ListCheckboxes;