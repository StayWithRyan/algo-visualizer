import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';

export default function BasicSlider(props) {
  return (
    <div>
        <InputLabel style={{ color: "#dbd8e3", height: "20px" }} id="demo-simple-select-standard-label">{props.title}</InputLabel>
        <Box sx={{ width: 200, p: 0 }}>
        <Slider
            aria-label="Small steps"
            defaultValue={props.default}
            onChangeCommitted={(_, value) => {props.onChange(value)}}
            step={props.step}
            min={props.min}
            max={props.max}
            style={{ color: "#9c27b0"}}
            valueLabelDisplay="auto"
        />
        </Box>
    </div>
  );
}