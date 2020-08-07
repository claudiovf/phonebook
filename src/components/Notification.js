import React from 'react'

const Notification = ({message}) => {
    const notifStyle = {
        color: 'white',
        padding: 10,
        backgroundColor: 'green',
        marginBottom: 10
    }

    if (message === null) {
        return null
    }
    return (
        <div style={notifStyle}>
            <em>{message}</em>
        </div>
    )
}
export default Notification