import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as Highcharts from 'highcharts/highstock';
import Axios from 'axios';

class CrytoChart extends Component{

    state = {
      done: false
    }
  
    componentWillMount(){
      let queryParams = new URLSearchParams(this.props.location.search)
      this.setState({
        symbol: queryParams.get('symbol'),
        curr: queryParams.get('curr')
      })
    }
  
    componentDidMount(){
      const {symbol, curr} = this.state;
      Axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=${curr}&limit=1000`)
        .then(({data}) =>{
          let chartingData = data.Data.reduce((acc, val) =>{
            acc.push([val.time * 1000, val.close])
            return acc;
          }, []);
          Highcharts.stockChart(this.chart, {
            rangeSelector: {
              selected: 1
          },
          title: {
              text: `${symbol} History in ${curr} Currency`
          },
          series: [{
              name: `${symbol}`,
              data: chartingData,
          }]
           });
          this.setState({done: true})
        })
  
      }
  
  
    render(){
      return (
        <React.Fragment>
          <div ref={chart => this.chart = chart}></div>
          {this.state.done && <div style={{textAlign: 'center', fontSize: '30px'}}><Link to ='/'>Back</Link></div>}
        </React.Fragment>
      )
    }
  }

  export default CrytoChart;