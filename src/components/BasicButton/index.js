import * as React from 'react';
import './style.css';
import InputLabel from '@mui/material/InputLabel';

import Constants from '../../constants';

import { useState } from 'react';

export default function BasicButton(props) {
    const [hover, setHover] = useState(false);
    const style = {border: `3px solid ${Constants.mainColor}`};
    const isDisabled = props.isDisabled;
    return (
        <button 
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
            style = {(hover && !isDisabled)? {...style, backgroundColor: Constants.mainColor} :{...style, backgroundColor: Constants.configurationBarColor}} 
            onClick={isDisabled? () => null : props.onClick } 
            className={isDisabled? "BasicDisabledButton": "BasicButton"}
        >
            <InputLabel className={isDisabled? "": "BasicButtonText"} style={{ color: Constants.textColor, height: "20px" }}>{props.title}</InputLabel>
        </button>
    );
}

