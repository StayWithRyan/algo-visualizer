import Constants from "../../../constants";

function HorizontalLine() {
    return (
        <h2 style = {{
            backgroundColor: Constants.mainColor,
            height: "0.3vh",
            color: Constants.mainBackground,
            userSelect: "none"
        }}>
        </h2>
    );
}

export default HorizontalLine;