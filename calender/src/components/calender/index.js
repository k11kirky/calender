import React from 'react';
import * as moment from 'moment';
import { filter } from 'ramda';
import './index.css';

class Calendar extends React.Component {

    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        {"<"}
                    </div>
                </div>
                <div className="col col-center">
                    <span>{this.props.calender.currentMonth.format(dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">{">"}</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = moment(this.props.calender.currentMonth).startOf('w')

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {moment(startDate).add(i, 'd').format(dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.props.calender;
        const { events }  = this.props.reminders;
        const monthStart = moment(currentMonth).startOf('M');
        const monthEnd = moment(monthStart).endOf('M');
        const startDate = moment(monthStart).startOf('w');
        const endDate = moment(monthEnd).endOf('w');
        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day.isSameOrBefore(endDate)) {
            for (let i = 0; i < 7; i++) {
                //make into util fucntions
                let isToday = event => day.isSame(event.startDate, 'd') || day.isSame(event.endDate, 'd');
                let todaysEvents = filter(isToday, events);
                formattedDate = day.format(dateFormat);
                const cloneDay = moment(day);
                days.push(
                    <div
                        className={`col cell ${
                            !day.isSame(monthStart, 'M')
                                ? "disabled"
                                : day.isSame(selectedDate, 'd') ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="numberOfEvents">{todaysEvents && todaysEvents.length > 0 ? `${todaysEvents.length} event(s)` : ""}</span>
                    </div>
                );
                day.add(1, 'd')
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.props.selectDate(day);
    };

    nextMonth = () => {
        this.props.changeMonth(this.props.calender.currentMonth.add(1, 'M'));
    };

    prevMonth = () => {
        this.props.changeMonth(this.props.calender.currentMonth.subtract(1, 'M'));
    };

    render() {
        console.log(this.props.reminders)
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar;