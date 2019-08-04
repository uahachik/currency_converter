import React, { Component } from 'react';
// import { LocalContext } from './context';
import '../../style/Office.css';
import Office from './Office';
import Spinner from '../layout/Spinner';

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            items: [],
            change: '1',
            amount: '',
            currency_1: '',
            currency_2: ''
        };
        this.handleAmount_1Change = this.handleAmount_1Change.bind(this);
        this.handleAmount_2Change = this.handleAmount_2Change.bind(this);
        this.handleCurrency_1Change = this.handleCurrency_1Change.bind(this);
        this.handleCurrency_2Change = this.handleCurrency_2Change.bind(this);
    }

    componentDidMount() {
        const hryvnia = {
            r030: 100,
            txt: "Українська гривня",
            rate: 1,
            cc: "UAH",
            exchangedate: "forever"
        }
        this.itemsList = fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20190804&json')
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        items: [hryvnia, ...data],
                        isLoading: false
                    });
                }
            )
            .catch(error => this.setState({error, isLoading: false}));
    }

    handleAmount_1Change(amount) {
        this.setState({change: '1', amount})
    }
    handleAmount_2Change(amount) {
        this.setState({change: '2', amount})
    }
    handleCurrency_1Change(currency) {
        this.setState({currency_1: currency})
    }
    handleCurrency_2Change(currency) {
        this.setState({currency_2: currency})
    }

    render() {
        const {isLoading, items, error, change, amount, currency_1, currency_2} = this.state;

        // conditions for change and rates of currencies
        const officeUser_1 = () => {
            if (!(currency_1 && currency_2)) {
                return '';
            }
            const [rate_1] = items.filter(item => item.txt === currency_1);
            return rate_1.rate;
        }
        const officeUser_2 = () => {
            if (!(currency_1 && currency_2)) {
                return '';
            }
            const [rate_2] = items.filter(item => item.txt === currency_2);
            return rate_2.rate;
        }

        // Math Convert
        const toConvert_1 = (change_2, office_1, office_2) => {
            return (change_2 * officeUser_2()) / officeUser_1();
        };
        const toConvert_2 = (change_1, user1, user2) => {
            return (change_1 * officeUser_1()) / officeUser_2();
        };

        const tryConvert = (amount, convert) => {
            const input = parseFloat(amount);
            const output = convert(input);
            const rounded = (Math.round(output * 100) / 100).toFixed(2);
            return rounded.toString();
        };

        const change_1 = change === '2' ? tryConvert(amount, toConvert_1) : amount;
        const change_2 = change === '1' ? tryConvert(amount, toConvert_2) : amount;

        const date = items.map(item => item.r030 === 840 ? item.exchangedate : null);

        return (
            <React.Fragment>
                {/* Display a message if we encounter an error*/}
                {error ? <p>{error.message}</p> : null}
                {/* Here's the data check*/}
                {!isLoading ? (
                    <React.Fragment>
                        <h4 className="Items-Data"> as at {date}</h4>
                        <div className="App-Container">
                            <div className="App-Component">
                                <div className="Box">
                                    <Office
                                        items={items}
                                        amount={change_1}
                                        // currency={currency_1}
                                        amountChanged={this.handleAmount_1Change}
                                        currencyChanged={this.handleCurrency_1Change}
                                    />
                                </div>
                            </div>
                            <h2>=</h2>
                            <div className="App-Component">
                                <div className="Box">
                                    <Office
                                        items={items}
                                        amount={change_2}
                                        // currency={currency_2}
                                        amountChanged={this.handleAmount_2Change}
                                        currencyChanged={this.handleCurrency_2Change}
                                    />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    // If there is a delay in data, let's let the user know it's loading
                    <h3>Loading...</h3>
                    // <Spinner/>
                )}
                <p>{items.map(item => item.txt + ', ')}</p>
            </React.Fragment>
        );
    }
}

export default Department;
