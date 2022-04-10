import './style.css';
import InputLabel from '@mui/material/InputLabel';
import Constants from '../../constants';

export default function BasicButton(props) {
    const isDisabled = props.isDisabled;
    return (
        <button 
            style = {{border: `3px solid ${Constants.mainColor}`}} 
            onClick={isDisabled? () => null : props.onClick } 
            className={isDisabled? "BasicDisabledButton": "BasicButton"}
        >
            <InputLabel className={isDisabled? "": "BasicButtonText"} 
                style={{ color: Constants.textColor, height: "20px", fontFamily: Constants.fontFamily  }}
            >
                {props.title}
            </InputLabel>
        </button>
    );
}

