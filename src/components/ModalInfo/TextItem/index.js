function TextItem(props) {
    return (
        <h2 style = {{
            fontWeight: 100,
            fontSize: "1.5em",
            userSelect: "none"
        }}>
            {props.children}
        </h2>
    );
}

export default TextItem;