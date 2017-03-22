import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import './results.sass'

function addCommas(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export default class CalculatorGraph extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="resultsContainer">
              <section>
                <h4>Your results</h4>
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <h3>{this.getResult('yearsToPay')} <small>Years</small></h3>
                    To repay the loan
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£{this.getResult('debtAfterGraduation')}</h3>
                    Debt after graduation
                  </div>
                  <div className="col-md-6 col-sm-6">

                    <h3>£{this.getResult('totalPay')}</h3>
                    Total amount to be paid
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£{this.getResult('estimatedFirstSalary')}</h3>
                    Estimated first salary
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£{this.getResult('averageMonthlyPayback')}</h3>
                    Average monthly returns
                  </div>
                </div>
              </section>
              <Line data={this.getChartData()}  width="600" height="220" style={{ 'maxWidth': '100%' }} redraw />
            </div>
        );
    }

    getResult(name) {
      if(!this.props.results) {
        return ''
      }

      if (this.props.results[name]*1 > 999) {
        return addCommas(this.props.results[name]);
      }

      return this.props.results[name];
    }

    getChartData() {
      if(!this.props.results) {
        return ''
      }

      let data = this.props.results['debtOverYears'];
      let len = Object.keys(data).length;
      let prettify = {};
      let skip = 0;
      let lastKey = 0;
      let lastActualKey = 0;

      for(let key in data) {
        lastActualKey = key;
        if(skip++ % parseInt(len/10) === 0) {
          prettify[key] = data[key];
          lastKey = key;
        }
      }

      if(lastKey!=lastActualKey) {
        delete prettify[lastKey];
        prettify[lastActualKey] = data[lastActualKey];
      }

      let labels = Object.keys(prettify)
      let datasets = [
          {
              label: "Loan",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: Object.values(prettify)
          }
      ]

      return { labels, datasets }
    }
}
