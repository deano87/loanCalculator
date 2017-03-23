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
        <div className="row col-md-10">
          <legend>Jobs</legend>
          {this.renderAlert()}
          <table className="table">
            <tbody>
              {this.renderJobs()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderJobs() {
    if(!this.props.jobs || !this.props.jobs[0]) {
      return;
    }
    let jobs = this.props.jobs[0];

    let flag = true;
    for(let k in jobs) {
      if(jobs[k].id === "new") {
        flag = false;
      }
    }
    if(flag) {
      jobs.push({id: "new", name: "", salaryGrowth: "", startSalary: ""});
    }

    let fields = [];
    let _this = this;

    for(let index in jobs) {
      let job = jobs[index];
      fields.push(<tr key={`jobRow_${job.id}`}>
        <td>
          <FormGroup controlId={`fgJobTitle[${job.id}]`}>
            <ControlLabel>Job Title</ControlLabel>
            <FormControl
              type="text"
              name={`jobTitle[${job.id}]`}
              defaultValue={job.name}
              placeholder="Enter job title"
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup controlId={`fgStartSalary[${job.id}]`}>
            <ControlLabel>Start Salary</ControlLabel>
            <FormControl
              type="text"
              name={`startSalary[${job.id}]`}
              defaultValue={job.startSalary}
              placeholder="Enter start salary"
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup controlId={`fgSalaryGrowth[${job.id}]`}>
            <ControlLabel>Salary Growth</ControlLabel>
            <FormControl
              type="text"
              name={`salaryGrowth[${job.id}]`}
              defaultValue={job.salaryGrowth}
              placeholder="Enter salary growth %"
            />
          </FormGroup>
        </td>
        <td>
          <ButtonToolbar style={{marginTop: "25px"}}>
            {function() {
              if(job.id !== "new") {
                return [
                  <Button bsStyle="primary" onClick={_this.saveRow.bind(_this, job.id)} key={`save_${job.id}`}>Save</Button>,
                  <Button bsStyle="danger" onClick={_this.deleteRow.bind(_this, job.id)} key={`delete_[${job.id}`}>Delete</Button>
                ];
              } else {
                return <Button bsStyle="success" onClick={_this.createRow.bind(_this)}>Create</Button>
              }
            }()}
          </ButtonToolbar>
        </td>
      </tr>)
    }

    return fields;
  }

  createRow(id) {
    let title = document.querySelector("[name='jobTitle[new]']").value;
    let startSalary = document.querySelector("[name='startSalary[new]']").value;
    let salaryGrowth = document.querySelector("[name='salaryGrowth[new]']").value;

    this.setState({waitForNotification: 'create'});
    this.props.createJob({title, startSalary, salaryGrowth});
  }

  saveRow(id) {
    let title = document.querySelector("[name='jobTitle[" + id + "]']").value;
    let startSalary = document.querySelector("[name='startSalary[" + id + "]']").value;
    let salaryGrowth = document.querySelector("[name='salaryGrowth[" + id + "]']").value;

    this.setState({waitForNotification: 'save'});
    this.props.updateJob(id, {title, startSalary, salaryGrowth});
  }

  deleteRow(id) {
    this.setState({waitForNotification: 'delete'});
    this.props.deleteJob(id);
  }

  renderAlert() {
    let message = 'Row ' + this.state.waitForNotification + 'd successfully';
    switch(this.state.waitForNotification) {
      case false:
        return;
      case 'create':
        if(!this.props.createdJob || !this.props.createdJob[0]) return;
        break;
      case 'update':
        if(!this.props.updatedJob || !this.props.updatedJob[0]) return;
        break;
      case 'delete':
        if(!this.props.deletedJob || !this.props.deletedJob[0]) return;
        break;
    }

    this.props.getJobs();

    return <Alert style={{cursor: "pointer"}} onClick={this.hideNotification.bind(this)}>
      {message}
    </Alert>

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
