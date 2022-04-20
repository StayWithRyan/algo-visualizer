import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

import { 
    MdKeyboardArrowLeft, MdKeyboardArrowRight,
    MdKeyboardArrowDown, MdKeyboardArrowUp,
    MdKeyboardReturn, MdKeyboardBackspace,
    MdSpaceBar
} from 'react-icons/md';

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai";

import Constants from "../../../constants";

function GeneralInfo() {
    const keyboardIconStyle = {width: "40px", color: Constants.blueColor};
    const confBarIconStyle = {width: "40px", color: Constants.mainColor};
    return (
        <>
            <TextItem>Виконувати алгоритм можна використовуючи клавіатуру, або кнопки на конфігураційній панелі.</TextItem>
            <TextItem tabs={1}><u>Використання конфігураційної панелі:</u></TextItem>
            <TextItem tabs={2}>
                <BiArrowToRight size={28} style={confBarIconStyle}/> — Виконати наступний крок алгоритму.
            </TextItem>
            <TextItem tabs={2}>
                <BiArrowToLeft size={28} style={confBarIconStyle}/> — Повернутися на попередній крок алгоритму.
            </TextItem>
            <TextItem tabs={2}>
                <AiOutlineDoubleRight size={28} style={confBarIconStyle}/> — Запустити автоматичне виконання алгоритму.
            </TextItem>
            <TextItem tabs={2}>
                <AiOutlineDoubleLeft size={28} style={confBarIconStyle}/> — Запустити автоматичне виконання алгоритму у зворотню сторону.
            </TextItem>
            <TextItem tabs={2}>
                <BsStopCircle size={28} style={confBarIconStyle}/> — Зупинити автоматичне виконання алгоритму.
            </TextItem>

            <TextItem tabs={1}><u>Використання клавіатури:</u></TextItem>
            <TextItem tabs={2}>
                <MdKeyboardArrowRight size={28} style={keyboardIconStyle}/>(Стрілка вправо) — Виконати наступний крок алгоритму.
            </TextItem>
            <TextItem tabs={2}>
                <MdKeyboardArrowLeft size={28} style={keyboardIconStyle}/>(Стрілка вліво) — Повернутися на попередній крок алгоритму.
            </TextItem>
            <TextItem tabs={2}>
                <MdKeyboardReturn size={28} style={keyboardIconStyle}/>(Enter) — Запустити\зупинити автоматичне виконання алгоритму.
            </TextItem>
            <TextItem tabs={2}>
                <MdKeyboardBackspace size={28} style={keyboardIconStyle}/>(Backspace) — Запустити\зупинити автоматичне виконання алгоритму у зворотню сторону.
            </TextItem>
            <TextItem tabs={2}>
                <MdKeyboardArrowUp size={28} style={keyboardIconStyle}/>(Стрілка вверх) — Збільшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={2}>
                <MdKeyboardArrowDown size={28} style={keyboardIconStyle}/>(Стрілка вниз) — Зменшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={2}>
                <MdSpaceBar size={28} style={keyboardIconStyle}/>(Space) — Згенерувани новий масив.
            </TextItem>
            <TextItem tabs={2}>
                Зауважте:
            </TextItem>
            <TextItem tabs={3}>
                Кнопки <MdKeyboardArrowRight size={28} style={keyboardIconStyle}/>, <MdKeyboardArrowLeft size={28} style={keyboardIconStyle}/> та 
                <MdSpaceBar size={28} style={keyboardIconStyle}/> недоступні під час автоматичного виконання алгоритму.
            </TextItem>
            <TextItem tabs={3}>
                Кнопки <MdKeyboardArrowRight size={28} style={keyboardIconStyle}/>, <MdKeyboardArrowLeft size={28} style={keyboardIconStyle}/>,
                <MdKeyboardArrowUp size={28} style={keyboardIconStyle}/> та <MdKeyboardArrowDown size={28} style={keyboardIconStyle}/> 
                можна зажати.
            </TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Щоб розпочати роботу з новим алгоритмом, достатньо його обрати. 
                Після цього одразу можете виконувати його. Не забудьте лише згенерувати новий масив, при необхідності.
            </TextItem>
            <TextItem tabs={1} style={{marginBottom: "0"}}>Згенерувати новий масив (на клавіатурі це клавіша "Space") можна також нажавши на повзунок розміру масиву (без пересування).</TextItem>
        </>
    );
}

export default GeneralInfo;