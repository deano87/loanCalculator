import React, { Component } from 'react';
import CalculatorForm from './containers/form';

export default class Calculator extends Component {
  render() {
    return (
      <div className="container">
        <div className="row col-md-5">
          <CalculatorForm />
        </div>
      </div>
    );
  }
}
