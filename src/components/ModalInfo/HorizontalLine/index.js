import Constants from "../../../constants";

function HorizontalLine() {
    return (
        <h2 style = {{
            backgroundColor: Constants.mainColor,
            height: "1px",
            color: Constants.mainBackground,
            userSelect: "none"
        }}>
        </h2>
    );
}

export default HorizontalLine;