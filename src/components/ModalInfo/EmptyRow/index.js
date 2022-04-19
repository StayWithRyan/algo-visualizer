import Constants from "../../../constants";

function EmptyRow() {
    return (
        <h2 style = {{
            color: Constants.mainBackground,
            userSelect: "none"
        }}>
            Empty
        </h2>
    );
}

export default EmptyRow;