function TextItem(props) {
    return (
        <h2 style = {{
            ...props.style,
            paddingLeft: props.tabs ? `${props.tabs * 50}px` : "0px",
            fontWeight: 100,
            fontSize: "1.5em",
            userSelect: "none",
            textAlign: "justify",
            display: "flex",
            flex: 1
        }}>
            {props.children}
        </h2>
    );
}

export default TextItem;