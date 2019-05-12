import React, {Component} from 'react';
import Department from './components/Department';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h6><b>National Bank of Ukraine</b></h6>
                <h2>The official exchange rate of currencies</h2>
                <Department/>
            </div>
        );
    }
}

export default App;
