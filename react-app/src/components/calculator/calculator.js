import React, { Component } from 'react';
import CalcForm from './containers/form/form';
import CalcResults from './containers/results/results';

export default class Calculator extends Component {
  render() {
    return (
      <div className="container">
        <div className="row col-md-5">
          <CalcForm />
        </div>
        <div className="row col-md-7">
          <CalcResults />
        </div>
      </div>
    );
  }
}
