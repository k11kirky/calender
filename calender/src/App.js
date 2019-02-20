import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, editReminder } from './actions/reminderActions';
import { selectDate, changeMonth } from './actions/calenderActions'
import Calendar from './components/calender';
import EventList from './components/eventList';
import NewEventModal from './components/newEventModal';
import ReactModal from 'react-modal';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isNewEventModalOpen: false
    }

    this.toggleNewEventModal = this.toggleNewEventModal.bind(this);
  }

  toggleNewEventModal() {
    this.setState({
      isNewEventModalOpen: !this.state.isNewEventModalOpen
    })
  }

  render() {
    const { isNewEventModalOpen } = this.state
    return (
      <div className="App">
        <Calendar
          calender={this.props.calender}
          reminders={this.props.reminders}
          selectDate={this.props.selectDate}
          changeMonth={this.props.changeMonth} />
        <EventList
          calender={this.props.calender}
          reminders={this.props.reminders}
          deleteReminder={this.props.deleteReminder}
          editReminder={this.props.editReminder}
          toggleNewEventModal={this.toggleNewEventModal} />
        <ReactModal
          isOpen={isNewEventModalOpen}
          //aware this is a bug - need to select app element
          ariaHideApp={false}>
          <NewEventModal
            addReminder={this.props.addReminder}
            calender={this.props.calender}
            toggleNewEventModal={this.toggleNewEventModal} />
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  addReminder: (reminder) => dispatch(addReminder(reminder)),
  editReminder: (newReminder) => dispatch(editReminder(newReminder)),
  deleteReminder: (id) => dispatch(deleteReminder(id)),
  selectDate: (date) => dispatch(selectDate(date)),
  changeMonth: (month) => dispatch(changeMonth(month)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

