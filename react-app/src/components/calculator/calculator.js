import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalcForm from './containers/form/form';
import CalcResults from './containers/results/results';
import { makeCalculation } from '../../actions/calc';

class Calculator extends Component {
  constructor(props) {
      super(props)
      this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-5">
          <CalcForm parentMakeCalculation={this.makeCalculation.bind(this)} />
        </div>
        {this.renderResults()}
      </div>
    );
  }

  componentDidMount() {

  }

  renderResults() {
    if(!this.props.calcResults || !this.props.calcResults[0]) {
      return;
    }

    return (<div className="row col-md-offset-1 col-md-6">
      <CalcResults results={this.props.calcResults[0]} />
    </div>)
  }

  makeCalculation(data) {
    this.props.makeCalculation(data);
  }


}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makeCalculation }, dispatch);
}

function mapStateToProps(state) {
    return {
        calcResults: state.calcResults
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
