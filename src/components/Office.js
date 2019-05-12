import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class Office extends Component {
    state = {
        txt: '',
        suggestions: []
    };

    onTextChanged = e => {
        const {items} = this.props;
        const value = e.target.value;
        const name = items.map(item => item.txt);
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = name.sort().filter(v => regex.test(v));
            // suggestions = name.match(/\b(\w)/g);
        }
        this.setState(() => ({suggestions, txt: value}));
    }

    amountChange = e => {
        const value = e.target.value;
        if (Number(value) !== 0) {
            const amount = value < parseFloat(value).toFixed(3)
                ? value
                : parseFloat(Math.floor(value * 100) / 100).toFixed(2);
            this.props.onAmountChange(amount);
        } else {
            this.props.onAmountChange('');
        }
    }

    suggestionSelected(value) {
        this.setState(() => ({
            txt: value,
            suggestions: []
        }))
        const currency = value;
        this.props.onCurrencyChange(currency);
    }

    render() {
        const {suggestions, txt} = this.state;
        const {amount} = this.props;
        return (
            <React.Fragment>
                <input value={isNaN(amount) || amount === ' ' ? '' : amount} type="text"
                       onChange={this.amountChange} required="required"
                       placeholder={"Your amount"} style={{borderBottom: "1.3px solid #09BF72"}}/>
                <input value={txt} type="text" onChange={this.onTextChanged}
                       placeholder={"Your currency"} required="required"/>
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
    onAmountChange: PropTypes.func.isRequired,
    onCurrencyChange: PropTypes.func.isRequired
};

export default Office;


