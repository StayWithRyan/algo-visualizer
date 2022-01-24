import './style.css';

function NavLink(props) {
    const isSelected = props.isSelected;
    return (
        <div className = "NavLinkContainer" onClick = {props.onSelect} style = {isSelected ?{borderBottom: '5px solid #9c27b0'} :{}} >
            <h1 className = "NavLinkText" style = {isSelected ?{color: "#9c27b0"} :{color: "#dbd8e3"}}>{props.text}</h1>
        </div>
    );
}

export default NavLink;