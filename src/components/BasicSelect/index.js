import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Constants from '../../constants';

const theme = createTheme({
    palette: {
        enabled: {
            main: Constants.mainColor,
        },
        disabled: {
            main: Constants.disabledMainColor ,
        }
    },
});

export default function BasicSelect(props) {
    return (
        <div>
            <InputLabel style={{ color: Constants.textColor, height: "20px", fontFamily: Constants.fontFamily }}>{props.title}</InputLabel>
            <ThemeProvider theme={theme}>
                <FormControl focused color={props.isDisabled ? "disabled": "enabled"} variant="standard" sx={{b:0, width: props.width || 200 }}>
                    <Select
                        style={{ color: props.isDisabled ? Constants.disabledTextColor : Constants.textColor, 
                            fontFamily: Constants.fontFamily, textAlign: props.centered ? "center" : ""}}
                        value={props.value}
                        onChange={(event) => {props.onChange(event.target.value)}}
                    >
                    {props.values.map(value => <MenuItem style={{fontFamily: Constants.fontFamily}} disabled = {props.isDisabled} key={value} value={value}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}