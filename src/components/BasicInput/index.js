

import * as React from 'react';
import './style.css';

import InputLabel from '@mui/material/InputLabel';
export default function BasicInput(props) {

    return(
        <div>
            <InputLabel style={{ color: "#dbd8e3", height: "20px" }}>{props.placeholder}</InputLabel>
            <input type="text" placeholder={props.placeholder} onChange={(event) => {props.onChange(event.target.value)}} className="BasicInput"/>
        </div>
    );
}
