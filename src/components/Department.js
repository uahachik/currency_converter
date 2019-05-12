import React, {Component} from 'react'
import Office from './Office';
import '../style/Office.css'

class Department extends Component {
    state = {
        error: null,
        isLoading: true,
        items: [],
        change: '1',
        amount: '',
        currency_1: '',
        currency_2: ''
    };

    componentDidMount() {
        const hryvnia = {
            r030: 100,
            txt: "Українська гривня",
            rate: 1,
            cc: "UAH",
            exchangedate: "forever"
        }
        this.itemsList = fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
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

    handleChange_1Change = (amount) => {
        this.setState({change: '1', amount})
    }
    handleChange_2Change = (amount) => {
        this.setState({change: '2', amount})
    }
    handleCurrency_1Change = (currency) => {
        this.setState({currency_1: currency})
    }
    handleCurrency_2Change = (currency) => {
        this.setState({currency_2: currency})
    }

    render() {
        const {isLoading, items, error, change, amount, currency_1, currency_2} = this.state;

        // conditions for change
        const officeUser_1 = (data, currency) => {
            if (!(currency_1 && currency_2)) {
                return '';
            }
            const office_1 = items.filter(item => item.txt === currency_1);
            const rate_1 = office_1.map(item => item.rate);
            return rate_1;
        }
        const officeUser_2 = (data, currency) => {
            if (!(currency_1 && currency_2)) {
                return '';
            }
            const office_2 = items.filter(item => item.txt === currency_2);
            const rate_2 = office_2.map(item => item.rate);
            return rate_2;
        }

        //change
        const toChange_1 = (change_2, user1, user2) => {
            return (change_2 * officeUser_2()) / officeUser_1();
        };
        const toChange_2 = (change_1, user1, user2) => {
            return (change_1 * officeUser_1()) / officeUser_2();
        };

        const tryConvert = (amount, convert) => {
            const input = parseFloat(amount);
            if (Number.isNaN(input)) {
                return '';
            }
            const output = convert(input);
            const rounded = (Math.round(output * 100) / 100).toFixed(2);
            return rounded.toString();
        };

        const change_1 = change === '2' ? tryConvert(amount, toChange_1) : amount;
        const change_2 = change === '1' ? tryConvert(amount, toChange_2) : amount;

        const data = data => {
            return items.map(item => item.r030 === 840 ? item.exchangedate : '')
            // items.forEach((item) => {
            //     // if(item.r030 === 840) {
            //     //     var day = item.exchangedate
            //     // }
            //     // console.log(item.r030 === 840 ? item.exchangedate : '');
            //     return item.r030 === 840 ? item.exchangedate : '';
            // })
        }

        return (
            <React.Fragment>
                {/* Display a message if we encounter an error*/}
                {error ? <p>{error.message}</p> : null}
                {/* Here's the data check*/}
                {!isLoading ? (
                    <React.Fragment>
                        <h4 className="Items-Data"> as at {data()}</h4>
                        <div className="App-Container">
                            <div className="App-Component">
                                <div className="Box">
                                    <Office
                                        items={items}
                                        amount={change_1}
                                        // currency={currency_1}
                                        onAmountChange={this.handleChange_1Change}
                                        onCurrencyChange={this.handleCurrency_1Change}/>
                                </div>
                            </div>
                            <h2>=</h2>
                            <div className="App-Component">
                                <div className="Box">
                                    <Office
                                        items={items}
                                        amount={change_2}
                                        // currency={currency_2}
                                        onAmountChange={this.handleChange_2Change}
                                        onCurrencyChange={this.handleCurrency_2Change}/>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    // If there is a delay in data, let's let the user know it's loading
                    <h3>Loading...</h3>
                )}
                <p>{items.map(item => item.txt + ', ')}</p>
            </React.Fragment>
        );
    }
}

export default Department;
