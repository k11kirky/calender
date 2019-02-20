import { findIndex, propEq, remove, merge } from 'ramda';

export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_REMINDER':
            let updatedEvents = state.events;
            let reminder = action.reminder;
            reminder.id = state.currentId + 1;
            updatedEvents.push(reminder)
            return merge(state, {
                currentId: reminder.id,
                events: updatedEvents
            });
        case 'EDIT_REMINDER':
            let findItemToEdit = findIndex(propEq('id', action.newReminder.id))(state.events);
            let editedEventList = state.events;
            editedEventList[findItemToEdit] = action.newReminder;
            return merge(state, {
                events: editedEventList
            });
        case 'DELETE_REMINDER':
            let findItemInList = findIndex(propEq('id', action.id))(state.events);
            let newEventList = remove(findItemInList, 1)(state.events);
            return merge(state, {
                events: newEventList
            });
        default:
            return state;
    }
}