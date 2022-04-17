import './style.css';
import {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Constants from '../../constants';

export default function BasicButton(props) {
    const isDisabled = props.isDisabled;
    
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        // remove focus from button field.
        var tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);
    }, [counter]);

    return (
        <button 
            style = {{border: `3px solid ${Constants.mainColor}`}} 
            onClick={() => {setCounter(counter+1); if(!isDisabled) {props.onClick();}}} 
            className={isDisabled? "BasicDisabledButton": "BasicButton"}
        >
            <InputLabel className={isDisabled? "": "BasicButtonText"}
                style={{ color: Constants.textColor, height: "20px", fontFamily: Constants.fontFamily  }}
            >
                {props.title}
            </InputLabel>
        </button>
    );
}

