export const selectDate = (date) => dispatch => {
    dispatch({
        type: 'CHANGE_DATE',
        payload: {
            selectedDate: date
        }
    })
}

export const changeMonth = (newMonth) => dispatch => {
    dispatch({
        type: 'CHANGE_MONTH',
        payload: {
            currentMonth: newMonth
        }
    })
}