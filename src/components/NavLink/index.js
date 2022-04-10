import './style.css';

import Constants from '../../constants';

function NavLink(props) {
    const isSelected = props.isSelected;
    return (
        <div className = "NavLinkContainer" onClick = {props.onSelect} 
            style = {isSelected 
                ? {borderBottom: `5px solid ${Constants.mainColor}`} 
                : {borderBottom: `5px solid ${Constants.navBarColor}`}} 
        >
            <div className = "NavLinkText" style = {isSelected ?{color: Constants.mainColor} :{color: Constants.textColor}}>{props.text}</div>
        </div>
    );
}

export default NavLink;