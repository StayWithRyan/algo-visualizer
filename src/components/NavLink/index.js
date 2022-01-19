import './style.css';

function NavLink(props) {
    const isSelected = props.isSelected;
    return (
        <div className = {isSelected? "NavLink": ""} onClick = {props.onSelect}>
            <h1>{props.text}</h1>
        </div>
    );
}

export default NavLink;