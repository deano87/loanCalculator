import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'react-chartjs';
import './results.sass'

function rand(min, max, num) {
          var rtn = [];
          while (rtn.length < num) {
            rtn.push((Math.random() * (max - min)) + min);
          }
          return rtn;
        }

var chartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: rand(32, 100, 7)
                }
            ]
          };

class CalculatorGraph extends Component {

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
                    <h3>21 <small>Years</small></h3>
                    To fully repay the loan
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£40,630</h3>
                    Debt after graduation
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£60,320</h3>
                    Total amount to be paid
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£35,000</h3>
                    Estimated first salary
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <h3>£200</h3>
                    Average monthly returns
                  </div>
                </div>
              </section>
              <Line data={chartData}  width="600" height="220" style={{ 'maxWidth': '100%' }} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch);
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorGraph);
