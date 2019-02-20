export const addReminder = (reminder) => dispatch => {
    dispatch({
        type: 'ADD_REMINDER',
        reminder
    })
}

export const editReminder = (newReminder) => dispatch => {
    dispatch({
        type: 'EDIT_REMINDER',
        newReminder
    })
}

export const deleteReminder = (id) => dispatch => {
    dispatch({
        type: 'DELETE_REMINDER',
        id
    })
}