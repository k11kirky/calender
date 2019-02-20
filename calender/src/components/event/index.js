import React from 'react';
import './index.css';
import EditEventModal from '../editEventModal';
import ReactModal from 'react-modal';

class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editModalOpen: false
        }
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    toggleEditModal() {
        this.setState({
            editModalOpen: !this.state.editModalOpen
        })
    }

    render() {
        const { id, name, startDate, endDate, color } = this.props.event;
        const { editModalOpen } = this.state
        return (
            <div className="eventWrapper">
                <p className="eventDate">{startDate.format("Do hh:mm a")} - {endDate.format("Do hh:mm a")}</p>
                <p className="eventName" style={{ color: color }}>{name}</p>
                <button onClick={this.toggleEditModal}>edit</button>
                <button onClick={() => this.props.deleteReminder(id)}>delete</button>
                <ReactModal
                    isOpen={editModalOpen}
                    //aware this is a bug - need to select app element
                    ariaHideApp={false}>
                    <EditEventModal
                        event={this.props.event}
                        toggleEditModal={this.toggleEditModal}
                        editReminder={this.props.editReminder} />
                </ReactModal>
            </div>
        );
    }
}

export default Event;