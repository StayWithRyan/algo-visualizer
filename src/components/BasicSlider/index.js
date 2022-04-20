import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';

import Constants from '../../constants';

export default function BasicSlider(props) {
    const [value, setValue] = useState(props.default);
    if(value > props.max) {
        setValue(props.max);
    }

    const handleKeyDown = (event) => {
        if(props.isActive) {
            if (event.code === 'ArrowUp') {
                if(value < props.max) {
                    let valueToSet = value + props.step <= props.max ? value + props.step : props.max;
                    props.onChange(valueToSet);
                    setValue(valueToSet);
                }
            }
            if (event.code === 'ArrowDown') {
                if(value > 0) {
                    let valueToSet = value - props.step >= props.min ? value - props.step : props.min;
                    props.onChange(valueToSet);
                    setValue(valueToSet);
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [value, setValue, props.max, props.step, props.isActive]);
    

    function preventKeyboardNavigation(event) {
        event.preventDefault();
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
                onKeyDown={preventKeyboardNavigation}
            />
            </Box>
        </div>
    );
}