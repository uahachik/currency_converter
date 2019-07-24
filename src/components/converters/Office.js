import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: '',
            suggestions: []
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
    }

    onTextChange(e) {
        const {items} = this.props;
        const value = e.target.value;
        const name = items.map(item => item.txt);
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, 'i');
            suggestions = name.sort().filter(v => regex.test(v))
        }
        this.setState(() => ({suggestions, txt: value}));
    }

    onAmountChange(e) {
        const value = e.target.value;
        if (Number(value) || !value) {
            const amount = value < parseFloat(value).toFixed(3)
                ? value
                : parseFloat(Math.floor(value * 100) / 100).toFixed(2);
            this.props.amountChanged(amount);
        }
        /* TODO Input TimeOut
        if (isNaN(value))*/ /*else {
            const input = value.toString();
            console.log(isNaN(input));
            console.log('input - ' + input);
            // const regex = /\d*(?:\,|\.)\d*!/;
            const regex = /[\d*,]/;
            let res = regex.exec(input);
            console.log('res1 - ' + res);
            res = res[0].replace(',', '.');
            console.log('res2 - ' + res);*/
    }

    suggestionSelected(value) {
        this.setState(() => ({
            txt: value,
            suggestions: []
        }))
        const currency = value;
        this.props.currencyChanged(currency);
    }

    render() {
        const {suggestions, txt} = this.state;
        const {amount} = this.props;
        return (
            <React.Fragment>
                <input
                    value={isNaN(amount) || amount === ' ' ? '' : amount}
                    type="text"
                    onChange={this.onAmountChange}
                    required="required"
                    placeholder={"Your amount"}
                    style={{borderBottom: '1.3px solid #09BF72'}}
                />
                <input
                    value={txt}
                    type="text"
                    onChange={this.onTextChange}
                    placeholder={"Your currency"}
                    required="required"
                />
                <ul>
                    {suggestions.length !== 0
                        ? (suggestions.map(item =>
                            <li key={uuid()} onClick={() => this.suggestionSelected(item)}>
                                {item}
                            </li>))
                        : null}
                </ul>
            </React.Fragment>
        );
    }
}

Office.propTypes = {
    amount: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    amountChanged: PropTypes.func.isRequired,
    currencyChanged: PropTypes.func.isRequired
};

export default Office;



















