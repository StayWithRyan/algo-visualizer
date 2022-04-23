import TextItem from "../TextItem"

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai";

import Constants from "../../../constants";

function PlayBarInfo() {
    const confBarIconStyle = {color: Constants.mainColor, verticalAlign: "middle"};
    const iconSize = 28;

    return (
        <>
            <TextItem>Використання конфігураційної панелі:</TextItem>
            <TextItem tabs={1}>
                <BiArrowToRight size={iconSize} style={confBarIconStyle}/> — Виконати наступний крок алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                <BiArrowToLeft size={iconSize} style={confBarIconStyle}/> — Повернутися на попередній крок алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                <AiOutlineDoubleRight size={iconSize} style={confBarIconStyle}/> — Запустити автоматичне виконання алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                <AiOutlineDoubleLeft size={iconSize} style={confBarIconStyle}/> — Запустити автоматичне виконання алгоритму в протилежну сторону.
            </TextItem>
            <TextItem tabs={1}>
                <BsStopCircle size={iconSize} style={confBarIconStyle}/> — Зупинити автоматичне виконання алгоритму.
            </TextItem>
        </>
    );
}

export default PlayBarInfo;