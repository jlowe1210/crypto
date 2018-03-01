import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FormattedNumber} from 'react-intl'
import setup from '../../Config/setup';

class CryptoTable extends Component{
    state = {
      filterTerm: setup.filterTerm || 'ALL'
    }
  
  
    changeFilterTerm = (e) =>{
      setup.filterTerm = e.target.value
      this.setState({
        filterTerm: e.target.value
      })
    }
  
    render(){
        let Table;
        if(this.props.tableData){
         Table = this.props.tableData.filter(value => {
           switch(this.state.filterTerm){
             case 'ALL':
              return value;
            case 'Positive':
              return value.percent_change_24h > 0;
            case 'Negative':
              return value.percent_change_24h < 0;
            default:
              return;
           }
         });
        }
    
      return(
        <React.Fragment>
          <select defaultValue={this.state.filterTerm} onChange={this.changeFilterTerm}>
            <option>ALL</option>
            <option>Positive</option>
            <option>Negative</option>
          </select>
          {this.props.tableData && 
            <div >
              <table className='table table-sm table-hover'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>Rank</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Symbol</th>
                    <th scope='col'>{this.props.tableData.other_price ? 'USD' : this.props.otherPrice}</th>
                    <th scope='col'>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {Table.map(data =>{
                     return <tr key ={data.symbol}>
                      <td>{data.rank}</td>
                      <td>{data.name}</td>
                      <td><Link to={{pathname: '/chart', search: `?symbol=${data.symbol}&curr=${this.props.otherPrice}`}}>{data.symbol}</Link></td>
                      <td>{<FormattedNumber value={Number(data.other_price).toFixed(2)} style="currency" currency={this.props.otherPrice} />}</td>
                      <td>{data.percent_change_24h}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          }
        </React.Fragment>
      )
    }
  
  }

  export default CryptoTable;