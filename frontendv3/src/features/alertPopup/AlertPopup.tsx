import { Alert } from '@mui/material';
import { closePopup, selectAlertText, selectPopupStatus, selectSeverity } from './alertPopupSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';

export const AlertPopup = () => {
    const dispatch = useAppDispatch()
    const popupStatus = useAppSelector(selectPopupStatus)
    const severity = useAppSelector(selectSeverity)
    const alertText = useAppSelector(selectAlertText)

    useEffect(() => {
        if(popupStatus === true){
            const timer = setTimeout(() => {
                dispatch(closePopup())
            }, 3000);
    
            // To clear or cancel a timer, you call the clearTimeout(); method, 
            // passing in the timer object that you created into clearTimeout().
    
            return () => clearTimeout(timer);
        }
    }, [popupStatus])

    return (
        <>
            <Alert
                variant="filled"
                severity={severity}
            >
                {alertText}
            </Alert>
        </>
    );
}