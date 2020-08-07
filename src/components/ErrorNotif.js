import React from 'react'

const ErrorNotif = ({message}) => {
    const errorStyle = {
        color: 'black',
        backgroundColor: 'tomato',
        padding: 10,
        marginBottom: 10
    }

    if(message === null) {
        return null
    }

    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}

export default ErrorNotif