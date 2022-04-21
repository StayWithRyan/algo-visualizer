import {useEffect, useState} from 'react';
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
    let [value, setValue] = useState(props.value);
    let [counter, setCounter] = useState(0);

    useEffect(() => {
        // remove focus from select field.
        var tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);
    }, [value, counter]);

    return (
        <div>
            <InputLabel style={{ color: props.isDisabled ? Constants.disabledTextColor : Constants.textColor, height: "20px", fontFamily: Constants.fontFamily, userSelect: "none" }}>{props.title}</InputLabel>
            <ThemeProvider theme={theme}>
                <FormControl focused color={props.isDisabled ? "disabled": "enabled"} variant="standard" sx={{b:0, width: props.width || 200 }}>
                    <Select
                        style={{
                            color: props.isDisabled ? Constants.disabledTextColor : Constants.textColor, 
                            fontFamily: Constants.fontFamily, textAlign: props.centered ? "center" : ""}}
                        value={value}
                        onChange={(event) => {props.onChange(event.target.value); setValue(event.target.value);}}
                    >
                    {props.values.map(value => 
                        <MenuItem 
                            onClick={() => {setCounter(counter + 1)}}
                            style={{fontFamily: Constants.fontFamily, fontWeight: value.includes("Загальна")  ? "800" : ""}}
                            disabled = {props.isDisabled} key={value} value={value}
                        >
                            {value}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}