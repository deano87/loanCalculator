import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Settings extends Component {
  constructor(props) {
      super(props)
      this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-5">
          List of settings
        </div>
      </div>
    );
  }


  makeCalculation(data) {
    this.props.makeCalculation(data);
  }


}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch);
}

function mapStateToProps(state) {
    return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
