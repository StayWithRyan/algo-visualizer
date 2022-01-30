import * as React from 'react';
import './style.css';
import InputLabel from '@mui/material/InputLabel';

import Defaults from '../../defaults';

import { useState } from 'react';

export default function BasicButton(props) {
    const [hover, setHover] = useState(false);
    const style = {border: `3px solid ${Defaults.mainColor}`};
    const isDisabled = props.isDisabled;
    return (
        <button 
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
            style = {(hover && !isDisabled)? {...style, backgroundColor: Defaults.mainColor} :{...style, backgroundColor: Defaults.configurationBarColor}} 
            onClick={isDisabled? () => null : props.onClick } 
            className={isDisabled? "BasicDisabledButton": "BasicButton"}
        >
            <InputLabel className={isDisabled? "BasicDisabledButtonText": "BasicButtonText"} style={{ color: Defaults.textColor, height: "20px" }}>{props.title}</InputLabel>
        </button>
    );
}

