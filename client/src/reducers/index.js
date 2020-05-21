import { combineReducers } from 'redux';

import { SET_EMPLOYEES,SET_SURVEYS,UPDATE_EMPLOYEE } from '../actions';


function employeeList(state = [], action) {
    switch (action.type) {
      case SET_EMPLOYEES:
        return state.concat(action.payload);
      default:
        return state
    }
  }


function surveys(state=[],action){
    switch(action.type){
      case SET_SURVEYS:
        return state.concat(action.payload);
      default:
        return state
    }
}

function currentEmployee(state={assignedSurveys:[]},action){
  switch(action.type){
    case UPDATE_EMPLOYEE:
      return Object.assign({},action.payload);
    default:
      return state
  }
}

const rootReducer = combineReducers({
    employeeList,
    surveys,
    currentEmployee
})
  
export default rootReducer