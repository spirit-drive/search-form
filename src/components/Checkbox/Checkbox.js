import React, { Component } from 'react';
import createComponent from "../../lib/createComponent"
const Checkbox_ = createComponent('checkbox', 'span');

const Text = ({children}) => <span className="checkbox__text">{children}</span>;

class Checkbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.value
        }
    }

    _onChange = () => {
        const checked = !this.state.checked;
        this.props.liftUpState({value: checked, text: this.props.text});
        this.setState({checked});
    };

    render() {
        return (
            <Checkbox_ className={this.props.className}>
                <label>
                    {this.props.valueToTheLeft && <Text>{this.props.text}</Text>}
                    <input
                        className="checkbox__box"
                        onChange={this._onChange}
                        checked={this.state.checked}
                        type="checkbox"
                        name={this.props.name}
                    />
                    {!this.props.valueToTheLeft && <Text>{this.props.text}</Text>}
                </label>

            </Checkbox_>
        )
    }
}

Checkbox.defaultProps = {
    liftUpState: state => console.log("Checkbox", state),
    valueToTheLeft: true,
    value: false,
    text: "text",
    name: null
};

export default Checkbox;