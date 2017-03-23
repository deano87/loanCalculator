import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getScripts, runScript } from '../../actions/scripts';
import {
  ButtonToolbar, Button, Alert
} from 'react-bootstrap';
class Scripts extends Component {
  constructor(props) {
      super(props)
      this.state = {}
      this.props.getScripts();
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-12">
          <legend>Scripts</legend>
          {this.renderAlert()}
          <table className="table">
            <thead>
              <tr>
                <th>Script Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderScripts()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderScripts() {
    if(!this.props.scripts || !this.props.scripts[0]) {
      return;
    }
    let scripts = this.props.scripts[0];
    let fields = [];

    for(let index in scripts) {
      fields.push(
        <tr key={`row_${index}`}>
          <td>{index}</td>
          <td>{scripts[index].description}</td>
          <td>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.runScript.bind(this, index)}>
                Run Script
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      )
    }

    return fields;
  }

  renderAlert() {
    if(this.state.waitForNotification) {
      return <Alert bsStyle="success" style={{cursor: "pointer"}} onClick={this.hideNotification.bind(this)}>
        The script has been activated
      </Alert>
    }
    return ;
  }

  runScript(name) {
    this.props.runScript(name);
    this.setState({waitForNotification: true});
  }

  hideNotification() {
    this.setState({waitForNotification: false});
  }

  makeCalculation(data) {
    this.props.makeCalculation(data);
  }


}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getScripts, runScript }, dispatch);
}

function mapStateToProps(state) {
    return {
      scripts: state.getScriptsReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scripts);
