import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {IntlProvider} from 'react-intl'


//COMPONENTS
import Main from './Components/MainComponent/main';
import FilterComponent from './Components/FilterComponent/filter';
import CrytoChart from './Components/CryptoChartComponent/Chart';

class App extends Component {
  render() {
    return (
      <IntlProvider locale='en'>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path='/' exact render={() => <Main render={(name, clicked, inx, selected) => <FilterComponent name={name} fn={clicked} inx = {inx} selected={selected} />} /> } />
            <Route path='/chart' component={CrytoChart} />
            <Route render={() => <Main render={(name, clicked, inx, selected) => <FilterComponent name={name} fn={clicked} inx = {inx} selected={selected} />} /> } />
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
