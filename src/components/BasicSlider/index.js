import {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';

import Constants from '../../constants';

export default function BasicSlider(props) {
    const [value, setValue] = useState(props.default);
    if(value > props.max) {
        setValue(props.max);
    }

    return (
        <div>
            <InputLabel 
                style={{ color: props.isDisabled ? Constants.disabledTextColor : Constants.textColor, height: "20px", fontFamily: Constants.fontFamily, userSelect: "none"}} 
                id="demo-simple-select-standard-label">{props.title}
            </InputLabel>
            <Box sx={{ width: 200, p: 0 }}>
            <Slider
                value = {value}
                disabled = {props.isDisabled}
                aria-label="Small steps"
                defaultValue={props.default}
                onChangeCommitted={(_, value) => {props.onChange(value);}}
                onChange={(_, value) => {setValue(value);}}
                step={props.step}
                min={props.min}
                max={props.max}
                style={{ color: props.isDisabled ? Constants.disabledMainColor : Constants.mainColor}}
                valueLabelDisplay="auto"
            />
            </Box>
        </div>
    );
}