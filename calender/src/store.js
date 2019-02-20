import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import * as moment from 'moment';

export default function configureStore(initialState = {
  calender: {
    selectedDate: moment(),
    currentMonth: moment()
  },
  reminders: {
    currentId: 3,
    events: [
      { id: 1, name: "Have Coffee With Dave", startDate: moment().subtract(15, 'm'), endDate: moment().add(1.2, 'h'), color: "#F00" },
      { id: 2, name: "2 Day Disco", startDate: moment().add(1.5, 'd'), endDate: moment().add(2.5, 'd'), color: "#0F0" },
      { id: 3, name: "Build Spaceship", startDate: moment(), endDate: moment().add(15, 'm'), color: "#00F" }
    ]
  }
}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
