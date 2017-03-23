import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormGroup,    ControlLabel,
  FormControl,  ButtonToolbar,
  Button,       Glyphicon,
  Alert
} from 'react-bootstrap';
import serialize  from 'form-serialize'
import { getSettings, updateSetting } from '../../actions/settings';

class Settings extends Component {
  constructor(props) {
      super(props)
      this.state = {
        inflation: '',
        womenSalaryRatio: '',
        waitForNotification: false
      }

      this.props.getSettings();
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-5">
          <form id="settings-form">
            <legend>Settings</legend>
            {this.renderAlert()}
            {this.renderSettings()}

            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.updateSettings.bind(this)}>
                Save
              </Button>
            </ButtonToolbar>
          </form>

        </div>
      </div>
    );
  }

  renderSettings() {
    if(!this.props.settings || !this.props.settings[0]) {
      return;
    }
    let settings = this.props.settings[0];
    let fields = [];

    for(let index in settings) {
      fields.push(
        <FormGroup controlId={`fg${settings[index].key}`} key={`fc${settings[index].key}`}>
          <ControlLabel>{settings[index].display_name}</ControlLabel>
          <FormControl
            type="text"
            name={`settings[${settings[index].id}]`}
            defaultValue={settings[index].value}
          />
        </FormGroup>
      )
    }

    return fields;
  }

  renderAlert() {
    if(!this.props.saved || !this.props.saved[0]) {
      return;
    }
    if(this.state.waitForNotification) {
      if(this.props.saved[0]["status"] == "ok") {
        return <Alert bsStyle="success" style={{cursor: "pointer"}} onClick={this.hideNotification.bind(this)}>
          All changes saved!
        </Alert>
      } else {
        return <Alert bsStyle="warning" style={{cursor: "pointer"}} onClick={this.hideNotification.bind(this)}>
          Something went wrong, please try again later!
        </Alert>
      }
    }
    return ;
  }

  hideNotification() {
    this.setState({waitForNotification: false});
  }

  updateSettings() {
    let form = document.querySelector("#settings-form");
    let hash = serialize(form, { hash: true });
    this.setState({waitForNotification: true});
    this.props.updateSetting(hash)
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSettings, updateSetting }, dispatch);
}

function mapStateToProps(state) {
    return {
      settings: state.getStateSettings,
      saved: state.updateStateSetting
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
