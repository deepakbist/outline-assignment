import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEmployees, loadSurveys, updateEmployee,submitData } from '../actions/';
import 'bulma/css/bulma.css';


function mapStateToProps(state) {
    return {
        currentEmployee: state.currentEmployee,
        employeeList: state.employeeList,
        surveys: state.surveys
    };
}

const style = {
    inputStyle: {
        border: 'none',
        boxShadow: 'none'
    }
}

class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchSurvey: null,
            searchAssignedSurvey: null
        }
    }

    componentDidMount() {
        this.props.dispatch(loadEmployees());
        this.props.dispatch(loadSurveys());

    }

    submit = ()=>{
        this.props.dispatch(submitData());
    }



    handleChange = (e) => {
        let state = this.state;
        if(e.target.name ==='employee'){
            this.props.dispatch(updateEmployee(JSON.parse(e.target.value)));
            return;
        }else if(e.target.name === 'surveySearch'){
            state.searchSurvey = e.target.value;
        }else if(e.target.name === 'assignedSurveySearch'){
            state.searchAssignedSurvey = e.target.value;
        }
        this.setState(state);
    }
    isAlreadyAdded(id) {
        let surveyArray = this.props.currentEmployee.assignedSurveys
        for (let i = 0; i < surveyArray.length; i++) {
            if (id === surveyArray[i].id) {
                return false;
            }
        }
        return true;
    }

    addSurvey = (survey) => {
        let currentEmployee = this.props.currentEmployee;
        currentEmployee.assignedSurveys.push(survey);
        this.props.dispatch(updateEmployee(currentEmployee));
    }

    removeSurvey = (survey) =>{
        let currentEmployee = this.props.currentEmployee;
        currentEmployee.assignedSurveys = currentEmployee.assignedSurveys.filter(s=>s.id !==survey.id);
        this.props.dispatch(updateEmployee(currentEmployee));
    }
    render() {
        const selectOptions = <>
            {this.props.employeeList.map(emp => (
                <option key={emp.id} value={JSON.stringify(emp)}>{emp.name}</option>
            ))}
        </>
        const surveyList = <tbody>
            {
                this.props.surveys.filter((data)=>{
                    if(this.state.searchSurvey === null){
                        return data;
                    }
                    const regex = RegExp(this.state.searchSurvey.toLowerCase());
                    if(regex.test(data.title.toLowerCase())){
                        return data
                    }
                    return false
                }).map(survey => (
                    <tr key={survey.id}>
                        <td>
                            <div className="columns is-vcentered is-mobile" style={{minHeight:60}}>
                                <div className="column is-8"> <p className="is-size-6">{survey.title}</p></div>
                                <div className="column is-4">
                                    {
                                        this.isAlreadyAdded(survey.id) ?
                                            <button onClick={() => { this.addSurvey(survey) }} className="button is-text" style={{ float: 'right' }}>+ADD</button>
                                            : ''
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        const assignedSurveys = <tbody>
            {
                this.props.currentEmployee.assignedSurveys.filter((data)=>{
                    if(this.state.searchAssignedSurvey === null){
                        return data
                    }
                    const regex = RegExp(this.state.searchAssignedSurvey.toLowerCase());
                    if(regex.test(data.title.toLowerCase())){
                        return data
                    }
                    return false
                }).map((survey, i) => (
                    <tr key={i}>
                        <td>
                        <div className="columns is-vcentered is-mobile" style={{minHeight:60}}>
                                <div className="column is-8"> <p className="is-size-6">{survey.title}</p></div>
                                <div className="column is-4">
                                <button onClick={()=>{this.removeSurvey(survey)}} className="button is-text" style={{ float: 'right' }}>-REMOVE</button>       
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        return (
            <div style={{ padding: '1em' }}>
                <div className="columns is-centered is-mobile" style={{ marginBottom: 15, marginTop: 15 }}>
                    <div className="column has-text-centered">
                        <p className="subtitle is-4">Select Employee</p>
                        <div className="select">
                            <select name="employee" onChange={this.handleChange}>
                                {selectOptions}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="columns is-centered">
                    <div className="column has-text-centered">
                        <p className="subtitle is-4">Survey List</p>
                        <div className="columns is-centered">
                            <div className="column is-three-fifths">
                                <table className="table is-bordered is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="control has-icons-right">
                                                    <input className="input" style={style.inputStyle} onChange={this.handleChange} name="surveySearch" type="text" placeholder="Search" />
                                                    <span className="icon is-right">
                                                        <i className="fa fa-search"></i>
                                                    </span>
                                                </div>

                                            </th>
                                        </tr>
                                    </thead>
                                    {surveyList}
                                </table>
                            </div>
                        </div>


                    </div>
                    <div className="column has-text-centered">
                        <p className="subtitle is-4">Assigned Surveys</p>
                        <div className="columns is-centered">
                            <div className="column is-three-fifths">
                                <table className="table is-bordered is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="control has-icons-right">
                                                    <input className="input" style={style.inputStyle} onChange={this.handleChange} name="assignedSurveySearch" type="text" placeholder="Search" />
                                                    <span className="icon is-right">
                                                        <i className="fa fa-search"></i>
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    {assignedSurveys}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns is-centered is-mobile">
                    <div className="column has-text-centered">
                    <button onClick={this.submit} className="button is-outlined" style={{width:'8em'}}>Done</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Homepage);