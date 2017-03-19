import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button,
  Glyphicon,
  Panel
} from 'react-bootstrap';
import './form.sass'

class CalculatorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
          open: false
        }
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
            <div className="formContainer">
                <legend>Student loan calculator</legend>

                <FormGroup controlId="fcJobType">
                  <ControlLabel>Job Type</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select">Select</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="other">Other</option>
                  </FormControl>
                </FormGroup>

                <FieldGroup
                  id="fcAge"
                  type="text"
                  label="Age"
                  placeholder="Enter your age"
                />


                <FormGroup controlId="fcGender">
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl componentClass="select" placeholder="Select">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormControl>
                </FormGroup>

                <FieldGroup
                  id="fcTuitionLoan"
                  type="text"
                  label="Tuition Loan"
                  placeholder="Enter your tuition loan amount"
                />

                <FieldGroup
                  id="fcMaintenanceLoan"
                  type="text"
                  label="Maintenance Loan"
                  placeholder="Enter your maintenance loan amount"
                />

              <Panel collapsible header={function() {
                return <div onClick={ () => _this.setState({ open: !_this.state.open })}>
                  <Glyphicon glyph="cog" /> Advanced settings
                </div>
              }()} expanded={this.state.open}>
                    <FieldGroup
                      id="fcAvgInflation"
                      type="text"
                      label="Average Inflation"
                      placeholder="Average Inflation"
                    />

                    <FieldGroup
                      id="fcSalaryGrowth"
                      type="text"
                      label="Salary Growth"
                      placeholder="Salary Growth"
                    />
                </Panel>

                <ButtonToolbar>
                  <Button bsStyle="primary" className="pull-right">
                    <Glyphicon glyph="education" />&nbsp; Calculate
                  </Button>
                </ButtonToolbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorForm);
