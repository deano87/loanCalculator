import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCalcSettings } from '../../../../actions/calc';
import {
  FormGroup,    ControlLabel,
  FormControl,  ButtonToolbar,
  Button,       Glyphicon,
  Panel
} from 'react-bootstrap';
import serialize  from 'form-serialize'
import revalidator from 'revalidator'
import './form.sass'

let schema = {
    properties: {
        jobType: {
            type: 'number',
            required: true,
            allowEmpty: false
        },
        age: {
            type: 'number',
            minimum: 5,
            maximum: 120,
            required: true,
            allowEmpty: false
        },
        tuition: {
            type: 'number',
            minimum: 500,
            maximum: 15000,
            required: true,
            allowEmpty: false
        },
        maintenance: {
            type: 'number',
            minimum: 0,
            maximum: 15000,
            required: true,
            allowEmpty: false
        },
        salaryGrowth: {
            type: 'number',
            minimum: 0,
            maximum: 10,
            required: true,
            allowEmpty: false
        },
        inflation: {
            type: 'number',
            minimum: -50,
            maximum: 50,
            required: true,
            allowEmpty: false
        }
    }
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class CalculatorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
          open: false,
          jobType: '',
          salaryGrowth: '',
          salaryStart: '',
          womenSalaryRatio: 1,
          age: '',
          tuition: 9000,
          maintenance: 4500,
          inflation: 0,
          valid: {},
          calcButtonClicked: false
        }

        props.getCalcSettings();
    }

    render() {
        function FieldGroup({ id, label, ...props }) {
          return (
            <FormGroup controlId={id}>
              <ControlLabel>{label}</ControlLabel>
              <FormControl {...props} />
            </FormGroup>
          );
        }

        let _this = this;

        return (
            <form id="calc-form" className="formContainer">
              <legend>Student loan calculator</legend>

              <p>
                This student loan repayment calculator was built
                to give you an <i>indication</i> of how much you might
                expect to pay back and over what period of time.
              </p>
              <hr />

              <FormGroup controlId="fcJobType" validationState={this.state.valid['jobType']}>
                <ControlLabel>Job Type</ControlLabel>
                <FormControl
                  name="jobType"
                  componentClass="select"
                  onChange={this.updateJobSettings.bind(this)}>
                  <option value="">Select</option>
                  {this.renderJobOptions()}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="fcAge" validationState={this.state.valid['age']}>
                <ControlLabel>Age</ControlLabel>
                <FormControl
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={this.state.age}
                  onChange={this.updateState.bind(this)}
                  data-state-name="age"
                />
              </FormGroup>

              <FormGroup controlId="fcDuration">
                  <ControlLabel>Course Duration</ControlLabel>
                  <FormControl name="courseDuration" componentClass="select" defaultValue="3">
                    <option value="1">1 Year</option>
                    {function() {
                      let options = []
                      for(let i=2; i<=15; i++) {
                        options.push(<option key={`duration_${i}`} value={i}>{i} Years</option>)
                      }
                      return options
                    }()}
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="fcTuitionLoan" validationState={this.state.valid['tuition']}>
                  <ControlLabel>Tuition Loan</ControlLabel>
                  <FormControl
                    type="number"
                    name="tuition"
                    placeholder="Enter your tuition loan amount"
                    value={this.state.tuition}
                    onChange={this.updateState.bind(this)}
                    data-state-name="tuition"
                  />
                </FormGroup>

                <FormGroup controlId="fcMaintenanceLoan" validationState={this.state.valid['maintenance']}>
                  <ControlLabel>Maintenance Loan</ControlLabel>
                  <FormControl
                    type="number"
                    name="maintenance"
                    placeholder="Enter your maintenance loan amount"
                    value={this.state.maintenance}
                    onChange={this.updateState.bind(this)}
                    data-state-name="maintenance"
                  />
                </FormGroup>

              <Panel collapsible header={function() {
                return <div onClick={ () => _this.setState({ open: !_this.state.open })}>
                  <Glyphicon glyph="cog" /> Advanced settings
                </div>
              }()} expanded={this.state.open}>
                    <FormGroup controlId="fcGender">
                      <ControlLabel>Gender</ControlLabel>
                      <FormControl name="gender" componentClass="select" onChange={this.updateSalaryByGender.bind(this)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="fcAvgInflation" validationState={this.state.valid['inflation']}>
                      <ControlLabel>Average Inflation %</ControlLabel>
                      <FormControl
                        type="number"
                        name="inflation"
                        placeholder="Average Inflation"
                        value={this.state.inflation}
                        onChange={this.updateState.bind(this)}
                        data-state-name="inflation"
                      />
                    </FormGroup>

                    <FormGroup controlId="fcSalaryGrowth" validationState={this.state.valid['salaryGrowth']}>
                      <ControlLabel>Salary Growth %</ControlLabel>
                      <FormControl
                        type="number"
                        name="salaryGrowth"
                        placeholder="Salary Growth"
                        value={this.state.salaryGrowth}
                        onChange={this.updateState.bind(this)}
                        data-state-name="salaryGrowth"
                      />
                    </FormGroup>


                </Panel>

                <input type="hidden" id="fcStartSalary" name="startSalary" value={this.state.salaryStart}  />
                <input type="hidden" id="fcWomenSalaryRatio" name="womenSalaryRatio" value={this.state.womenSalaryRatio} />

                <ButtonToolbar>
                  <Button bsStyle="primary" className="pull-right" onClick={this.makeCalc.bind(this)}>
                    <Glyphicon glyph="education" />&nbsp; Calculate
                  </Button>
                </ButtonToolbar>
            </form>
        );
    }

    renderJobOptions() {
      if(!this.props.calcSettings[0] || !this.props.calcSettings[0].jobTypes) {
        return;
      }

      return this.props.calcSettings[0].jobTypes.map((job, index) =>
        <option value={index} key={`job_${index}`}>
          {job.type}
        </option>
      )
    }

    updateJobSettings(event) {
      let index = event.target.value;
      let jobs = this.props.calcSettings[0].jobTypes;

      if(!this.state.calcButtonClicked) {
        this.setState({jobType: index}, this.isValidField.bind(this, 'jobType'));
      } else {
        this.setState({jobType: index}, this.isValidForm.bind(this));
      }

      if(index === '') {
        return;
      }

      this.setState({salaryGrowth: jobs[index].salary.growth});
      this.setState({salaryStart: jobs[index].salary.start});

      let inflation = this.props.calcSettings[0].inflation;
      this.setState({ inflation });

      let womenSalaryRatio = this.props.calcSettings[0].womenSalaryRatio;
      this.setState({ womenSalaryRatio });
    }

    updateSalaryByGender(event) {
      let start = document.querySelector("#fcStartSalary").dataset.start;
      let ratio = 1;
      if(this.props.calcSettings[0]) {
        ratio = this.props.calcSettings[0].womenSalaryRatio;
      }
      if(event.target.value === 'female') {
        this.setState({womenSalaryRatio: ratio});
      } else {
        this.setState({womenSalaryRatio: 1});
      }
    }

    updateState(event) {
      let stateName = event.target.dataset.stateName
      let value = event.target.value

      let obj = {}
      obj[stateName] = value;

      this.setState(obj, this.isValidField.bind(this, event.target.name));
      event.target.focus();
    }

    isValidField(field) {
      let noError = true;
      let obj = {}
      let value = this.state[field];
      obj[field] = isNumber(value)?value*1:value;

      let tempSchema = { properties: { }}
      tempSchema.properties[field] = schema.properties[field];
      let res = revalidator.validate(obj, tempSchema);

      let valid = this.state.valid;
      if (res.valid) {
        valid[field] = null
      } else {
        noError = false;
        valid[field] = 'error'
      }
      this.setState({valid});

      return noError;
    }

    isValidForm() {
      let obj = {}
      let valid = {};

      for(let field in schema.properties) {
        let value = this.state[field];
        obj[field] = isNumber(value)?value*1:value;
      }

      let res = revalidator.validate(obj, schema);

      if (!res.valid) {
        let err = res.errors
        for(let i in err) {
          let p = err[i].property
          valid[p] = 'error'
        }
      }

      let validSize = Object.keys(valid).length;

      if(validSize) {
        for(let key in valid) {
          if(key == "inflation" || key == "salaryGrowth") {
            validSize--;
          }
        }

        if(!validSize) {
          this.setState({open: true});
        }
      }

      this.setState({valid});

      return res.valid;
    }

    makeCalc() {
      this.setState({calcButtonClicked: true});
      if(!this.isValidForm()) {
        return;
      }

      let form = document.querySelector('#calc-form');
      let hash = serialize(form, { hash: true });
      this.props.parentMakeCalculation(hash);
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCalcSettings }, dispatch);
}

function mapStateToProps(state) {
    return {
        calcSettings: state.calcSettings,
        calcResults: state.calcResults
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorForm);
