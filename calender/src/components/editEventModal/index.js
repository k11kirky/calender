import React from 'react';
import TimePicker from 'rc-time-picker';
import { TwitterPicker } from 'react-color';
import { map } from 'ramda';
import './index.css';

import 'rc-time-picker/assets/index.css';

class EditEventModal extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            errors: [],
            id: this.props.event.id,
            name: this.props.event.name,
            startTime: this.props.event.startDate,
            endTime: this.props.event.endDate,
            color: this.props.event.color
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
        const { id, name, startTime, endTime, color } = this.state;
        if (name.length < 1) {
            errors.push("Reminder requires a name")
        }
        if (startTime.isAfter(endTime)) {
            errors.push("Start Time Must be Before End Time")
        }
        if (errors.length < 1) {
            this.props.editReminder({
                id,
                name,
                startDate: startTime,
                endDate: endTime,
                color
            })
            this.props.toggleEditModal();
        } else {
            this.setState({
                errors
            })
        }
    }

    render() {
        const format = 'h:mm a'
        const { errors, startTime, endTime, color, name } = this.state;
        return (
            <div className="eventModal">
                <ul>{map(error => <li className="error">{error}</li>)(errors)}</ul>
                <div className="formSection">
                    <label>
                        Name:
                    <input type="text" name="name" value={name} onChange={this.handleNameChange} />
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
                    <button type="submit" onClick={this.validateAndSend}>UPDATE</button>
                    <button onClick={this.props.toggleEditModal}>CANCEL</button>
                </div>
            </div>
        );
    }
}

export default EditEventModal;