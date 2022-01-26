import * as React from 'react';
import './style.css';
import InputLabel from '@mui/material/InputLabel';

export default function BasicButton(props) {
    return (
        <button onClick={props.isDisabled? () => null : props.onClick } className={props.isDisabled? "BasicDisabledButton": "BasicButton"}>
            <InputLabel className={props.isDisabled? "BasicDisabledButtonText": "BasicButtonText"} style={{ color: "#dbd8e3", height: "20px" }}>{props.title}</InputLabel>
        </button>
    );
}

