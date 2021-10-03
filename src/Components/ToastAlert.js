import React from 'react'

function ToastAlert({text, role} ) {
    return (
        <div className={`toast-alert ${role ? "toast-alert--"+role : ""}`}>
            {text}
        </div>
    )
}

export default ToastAlert
