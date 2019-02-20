import React from 'react';
import TimePicker from 'rc-time-picker';
import { TwitterPicker } from 'react-color';
import { map } from 'ramda';
import './index.css';

import 'rc-time-picker/assets/index.css';

class NewEventModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            errors: [],
            name: "",
            startTime: this.props.calender.selectedDate,
            endTime: this.props.calender.selectedDate,
            color: ""
        }

        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.validateAndSend = this.validateAndSend.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    changeStartTime(date) {
        this.setState({
            startTime: date
        })
    }

    changeEndTime(date) {
        this.setState({
            endTime: date
        })
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleColorChange = (color) => {
        this.setState({ color: color.hex });
      };

    validateAndSend() {
        let errors = []
        const { name, startTime, endTime, color } = this.state;
        if (name.length < 1) {
            errors.push("Reminder requires a name")
        }
        if (name.length > 30) {
            errors.push("Please keep name under 30 chars")
        }
        if (startTime.isAfter(endTime)) {
            errors.push("Start Time Must be Before End Time")
        }
        if (errors.length < 1) {
            this.props.addReminder({
                name,
                startDate: startTime,
                endDate: endTime,
                color
            })
            this.props.toggleNewEventModal();
        } else {
            this.setState({
                errors
            })
        }
    }

    render() {
        const format = 'h:mm a'
        const { errors, startTime, endTime, color } = this.state;
        return (
            <div className="eventModal">
                <ul>{map(error => <li className="error">{error}</li>)(errors)}</ul>
                <div className="formSection">
                    <label>
                        Name:
                    <input type="text" name="name" onChange={this.handleNameChange} />
                    </label>
                </div>
                <div className="formSection">
                    <label>
                        Start Time:
                    <TimePicker
                            showSecond={false}
                            defaultValue={startTime}
                            className="xxx"
                            onChange={this.changeStartTime}
                            format={format}
                            use12Hours
                            inputReadOnly
                        />
                    </label>
                </div>
                <div className="formSection">
                    <label>
                        End Time:
                    <TimePicker
                            showSecond={false}
                            defaultValue={endTime}
                            className="xxx"
                            onChange={this.changeEndTime}
                            format={format}
                            use12Hours
                            inputReadOnly
                        />
                    </label>
                </div>
                <div className="formSection">
                    <TwitterPicker
                        color={color}
                        triangle="hide"
                        onChangeComplete={this.handleColorChange} />
                </div>
                <div className="formSection">
                    <input type="submit" onClick={this.validateAndSend} />
                    <button onClick={this.props.toggleNewEventModal}>close</button>
                </div>
            </div>
        );
    }
}

export default NewEventModal;