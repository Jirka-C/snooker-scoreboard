import React, {useState, useEffect} from 'react'
import getToastData from '../Helpers/getToastData';

function ToastAlert({toastStatus}) {
    
    const TOAST_REMOVE_DELAY = 5000;
    const [list, setList] = useState([]);

    useEffect(() => {
        if(toastStatus){
            setList([...list, toastStatus])
        }
    }, [toastStatus]);

    useEffect(() => {
        const interval = setTimeout(() => {
            list.shift()
            setList([...list]);
        }, TOAST_REMOVE_DELAY);
        
        return () => {
            clearInterval(interval);
        }        
    }, [list]);

    const removeToast = (index) => {
        list.splice(index, 1);
        setList([...list]);
    }

    return (        
        <div className="toast-alert">
            {list.map((element, index) => 
                <div key={index} className={`toast-alert__item ${getToastData(element).role ? "toast-alert--" + getToastData(element).role : ""}`}>
                    {getToastData(element).text}
                    <div className="toast-alert__close" onClick={() => removeToast(index)}>
                        <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default React.memo(ToastAlert)
