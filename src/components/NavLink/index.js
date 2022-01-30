import './style.css';

import Defaults from '../../defaults';

function NavLink(props) {
    const isSelected = props.isSelected;
    return (
        <div className = "NavLinkContainer" onClick = {props.onSelect} 
            style = {isSelected 
                ? {borderBottom: `5px solid ${Defaults.mainColor}`} 
                : {borderBottom: `5px solid ${Defaults.navBarColor}`}} 
        >
            <h1 className = "NavLinkText" style = {isSelected ?{color: Defaults.mainColor} :{color: Defaults.textColor}}>{props.text}</h1>
        </div>
    );
}

export default NavLink;