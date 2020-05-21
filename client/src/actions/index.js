export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SET_SURVEYS = 'SET_SURVEYS';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const REMOVE_SURVEY = 'REMOVE_SURVEY';
export const UPDATE_EMPLOYEES = 'UPDATE_EMPLOYEES';

const axios = require('axios');

export function updateEmployee(payload){
    return{
        type: UPDATE_EMPLOYEE,
        payload
    }
}

export function setEmployees(payload){
    return{
        type: SET_EMPLOYEES,
        payload
    }
}

export function setSurveys(payload){
    return{
        type: SET_SURVEYS,
        payload
    }
}




export function loadEmployees(){
    return (dispatch)=>{
        axios.get('/api/employees').then(function(response){
            dispatch(setEmployees(response.data));
            if(response.data.length>0){
                dispatch(updateEmployee(response.data[0]));
            }
        }).catch(function(err){
            console.log('error in getting employees',err);
        })
          
    }
}

export function loadSurveys(){
    return (dispatch)=>{
        axios.get('/api/surveys').then(function(response){
            dispatch(setSurveys(response.data))
        }).catch(function(err){
            console.log('error in getting employees',err);
        })
          
    }
}


export function submitData(){
    return (dispatch,getState)=>{
        const { currentEmployee } = getState();

        axios.post('/api/updateEmployee',currentEmployee).then(function(response){
            console.log('updated data successfully',response);
        }).catch(function(err){
            console.error('error in uploading data',err);
        })
    }
}