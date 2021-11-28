import React, {useState, useEffect} from 'react'

function ToastAlert({status, setStatus}) {

    //const [toastData, setToastData] = useState([])

    const getToast = (status) => {
        let role = null;
        let text = null;

        switch (status) {
            case 500:
                role = "error"
                text = "Nepodařilo se připojit k databázi. Zkuste to prosím za pár minut."
                break;            
            case 404:
                role = "error"
                text = "Požadovanou hru se nepodařilo načíst. Zkontrolujte, jestli máte správný odkaz"
                break;
            case 1:
                role = "success"
                text = "OK"
                break;
            default:
                role = "info"
                text = "INFO"
                break;
        }

        return {role, text}
    }
    
	useEffect(() => {
        setTimeout(() => {
            console.log(status.length);
            //status.splice(status.length, 1);
            //setStatus([...status])
        }, 5000);
	},[status]);

    const removeToast = (index) => {
        status.splice(index, 1);
        setStatus([...status])
    }


    return (        
        <div className="toast-alert">
            {status.map((element, index) => 
                <div key={index} className={`toast-alert__item ${getToast(element).role ? "toast-alert--"+getToast(element).role : ""}`}>
                    {getToast(element).text}
                    <div className="toast-alert__close" onClick={() => removeToast(index)}>
                        <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ToastAlert
