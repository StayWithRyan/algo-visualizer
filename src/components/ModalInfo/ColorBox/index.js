import { RiCheckboxBlankFill} from "react-icons/ri";

function ColorBox({color}) {
    return (
        <RiCheckboxBlankFill size={28} style={{color: color, verticalAlign: "middle"}}/>
    );
}

export default ColorBox;