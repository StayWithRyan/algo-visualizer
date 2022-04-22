function TextItem(props) {
    return (
        <h2 style = {{
            ...props.style,
            paddingLeft: props.tabs ? `${props.tabs * 3}vw` : "0px",
            fontWeight: 100,
            fontSize: "1.5em",
            textAlign: props.nojustify? "none" : "justify",
            display: "flex",
            flex: 1
        }}>
            <div style={{display: "block"}}>
                {props.children}
            </div>
        </h2>
    );
}

export default TextItem;