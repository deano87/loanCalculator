import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'react-chartjs';
import './graph.sass'

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
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: rand(32, 100, 7)
                },
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
            <div className="graphContainer">
              <Line data={chartData}  width="700" height="550"/>
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
