import './style.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

export default function BasicSelect(props) {
    return (
        <div>
            <InputLabel style={{ color: "#dbd8e3", height: "20px" }}>{props.title}</InputLabel>
            <FormControl focused color="secondary" variant="standard" sx={{b:0, width: 200 }}>
                <Select
                    style={{ color: "#dbd8e3" }}
                    value={props.value}
                    onChange={(event) => {props.onChange(event.target.value)}}
                >
                {props.values.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}