import React, {Component} from 'react';
import axios from 'axios';
import setup from '../../Config/setup';
import CryptoTable from '../CryptoTableComponent/Table'

class Main extends Component {
    state = {
      inx: 1,
      inx2: 2,
      Options: {
        limit: [10, 50, 100],
        languages: [ 'USD', 'AUD', 'BRL',
      'CAD', 'CHF', 'CLP', 'CNY',
      'CZK', 'DKK', 'EUR', 'GBP',
      'HKD', 'HUF', 'IDR', 'ILS',
      'INR', 'JPY', 'KRW', 'MXN',
      'MYR', 'NOK', 'NZD', 'PHP',
      'PKR', 'PLN', 'RUB', 'SEK',
      'SGD', 'THB', 'TRY', 'TWD',
      'ZAR']
      },
      defaultSearch: {
        defaultCurr: setup.defaultCurr || 'USD',
        defaultLimit:  setup.defaultLimit || '10'
      },
  
      tableData: null
  
    }
  
    componentDidMount(){
      this.getCrypto(this.state.defaultSearch);
    }

    getCrypto(query) {
      axios.get('https://api.coinmarketcap.com/v1/ticker/', {
        params: {
          convert: query.defaultCurr,
          limit: query.defaultLimit
        }
      }).then(({data}) =>{
        const idk = [];
            for (let i = 0; i < data.length; i ++) {
              idk.push({
                rank: data[i].rank,
                name: data[i].name,
                symbol: data[i].symbol,
                price_usd: data[i].price_usd,
                percent_change_24h: data[i].percent_change_24h,
                other_price :
                data[i]['price_' + this.state.defaultSearch.defaultCurr.toLowerCase()]
              });
            }
            this.setState({
              tableData: idk
            })
      })
    }
    changeFilter = (e, inx) =>{
      switch(inx){
        case 1:
          setup.defaultLimit = e.target.value
          this.setState({
            defaultSearch: {...this.state.defaultSearch, defaultLimit: e.target.value}
          }, () =>{
            this.getCrypto(this.state.defaultSearch)
          });
          return;
        case 2:
          setup.defaultCurr = e.target.value
          this.setState({
            defaultSearch: {...this.state.defaultSearch, defaultCurr: e.target.value}
          }, ()=>{
            this.getCrypto(this.state.defaultSearch)
          })
          return;
        default: 
          return;
      }
    }
    render(){  
      return(
        <React.Fragment>
          {this.props.render(this.state.Options.limit, this.changeFilter, this.state.inx, this.state.defaultSearch.defaultLimit)}
          {this.props.render(this.state.Options.languages, this.changeFilter, this.state.inx2, this.state.defaultSearch.defaultCurr)}
          <CryptoTable tableData = {this.state.tableData} otherPrice = {this.state.defaultSearch.defaultCurr}  />
        </React.Fragment>
      );
    }
  }
export default Main;

