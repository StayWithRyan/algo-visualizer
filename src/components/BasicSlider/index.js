import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';

import Defaults from '../../defaults';

export default function BasicSlider(props) {
  return (
    <div>
        <InputLabel style={{ color: Defaults.textColor, height: "20px" }} id="demo-simple-select-standard-label">{props.title}</InputLabel>
        <Box sx={{ width: 200, p: 0 }}>
        <Slider
            disabled = {props.isDisabled}
            aria-label="Small steps"
            defaultValue={props.default}
            onChangeCommitted={(_, value) => {props.onChange(value)}}
            step={props.step}
            min={props.min}
            max={props.max}
            style={{ color: Defaults.mainColor}}
            valueLabelDisplay="auto"
        />
        </Box>
    </div>
  );
}