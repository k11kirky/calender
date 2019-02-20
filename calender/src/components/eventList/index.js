import React from 'react';
import * as moment from 'moment';
import { filter, map, sort } from 'ramda';
import Event from "../event"
import './index.css';

class EventList extends React.Component {


    renderEventsList() {
        const { currentMonth, selectedDate } = this.props.calender;
        const { events } = this.props.reminders;
        const monthStart = moment(currentMonth).startOf('M');
        const monthEnd = moment(monthStart).endOf('M');

        let day = monthStart;

        let eventsList = [];

        while (day.isSameOrBefore(monthEnd)) {
            let isToday = event => day.isSame(event.startDate, 'd') || day.isSame(event.endDate, 'd');
            let todaysEvents = filter(isToday, events);
            let isEarlier = (event1, event2) => {
                return event1.startDate.isBefore(event2.startDate) ? -1 : 1;
            }
            let sortedEvents = sort(isEarlier, todaysEvents);
            eventsList.push(
                <div className="row" key={day}>
                    <div className={`date ${day.isSame(selectedDate, "d") ? "selected" : null}`}>{day.format("Do MMMM")}</div>
                    {map(event => (
                        <Event
                            event={event}
                            deleteReminder={this.props.deleteReminder}
                            editReminder={this.props.editReminder} />
                    ), sortedEvents)}
                </div>)
            day.add(1, 'd')
        }
        return <div className="body">{eventsList}</div>;
    }

    render() {
        const { selectedDate } = this.props.calender;
        console.log("rendering")
        return (
            <div className="eventsList">
                {/* make this a banner Component */}
                <div className="eventListBanner">
                    <h4>Current Selected Date: {selectedDate.format("Do MMMM YYYY")}</h4>
                    <button onClick={this.props.toggleNewEventModal}>Add</button>
                </div>
                {this.renderEventsList()}
            </div>
        );
    }
}

export default EventList;