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
            <h1 className = "NavLinkText" style = {isSelected ?{color: Constants.mainColor} :{color: Constants.textColor}}>{props.text}</h1>
        </div>
    );
}

export default NavLink;