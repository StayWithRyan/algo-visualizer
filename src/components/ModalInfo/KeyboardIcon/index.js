function KeyboardIcon(props) {
    return (
        <img draggable="false" width="28" height={props.height || "28"} src={props.src} 
            style={{verticalAlign: "middle", paddingRight: "0.5vw", paddingLeft: props.paddingLeft ? "0.5vw" : "0"}}
        />
    );
}

export default KeyboardIcon;