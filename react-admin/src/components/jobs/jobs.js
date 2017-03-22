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
import { getJobs, createJob, updateJob, deleteJob } from '../../actions/jobs';

class Jobs extends Component {
  constructor(props) {
      super(props)
      this.state = {
        waitForNotification: false
      }

      this.props.getJobs();
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-5">
          <legend>Jobs</legend>
          {this.renderAlert()}
          {this.renderJobs()}
        </div>
      </div>
    );
  }

  renderJobs() {
    if(!this.props.jobs || !this.props.jobs[0]) {
      return;
    }
    let jobs = this.props.jobs[0];
    let fields = [];

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

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getJobs, createJob, updateJob, deleteJob }, dispatch);
}

function mapStateToProps(state) {
    return {
      jobs: state.getJobsReducer,
      createdJob: state.createJobReducer,
      updatedJob: state.updateJobReducer,
      deletedJob: state.deleteJobReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
