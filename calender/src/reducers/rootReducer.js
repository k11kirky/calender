import { combineReducers } from 'redux';
import reminders from './reminders';
import calender from './calender';

export default combineReducers({
    reminders,
    calender
});