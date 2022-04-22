import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"
import KeyboardIcon from "../KeyboardIcon"
import ColorBox from "../ColorBox"

import KeyboardArrowRight from '../../../icons/arrow-right.png';
import KeyboardArrowLeft from '../../../icons/arrow-left.png';
import KeyboardArrowUp from '../../../icons/arrow-up.png';
import KeyboardArrowDown from '../../../icons/arrow-down.png';
import KeyboardEnter from '../../../icons/enter.png';
import KeyboardBackspace from '../../../icons/backspace.png';
import KeyboardSpace from '../../../icons/space.png';

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai";

import Constants from "../../../constants";
import TreeBasedConstants from "../../../screens/TreeBasedPage/constants";

function GeneralInfo() {
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
                <AiOutlineDoubleLeft size={iconSize} style={confBarIconStyle}/> — Запустити автоматичне виконання алгоритму у протилежну сторону.
            </TextItem>
            <TextItem tabs={1}>
                <BsStopCircle size={iconSize} style={confBarIconStyle}/> — Зупинити автоматичне виконання алгоритму.
            </TextItem>

            <HorizontalLine/>

            <TextItem>Використання клавіатури:</TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowRight}/>(Стрілка вправо) — Виконати наступний крок алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowLeft}/>(Стрілка вліво) — Повернутися на попередній крок алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardEnter}/>(Enter) — Запустити\зупинити автоматичне виконання алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardBackspace}/>(Backspace) — Запустити\зупинити автоматичне виконання алгоритму у протилежну сторону.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowUp}/>(Стрілка вверх) — Збільшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowDown}/>(Стрілка вниз) — Зменшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardSpace} height={18} />(Space) — Згенерувати нове дерево\масив.
            </TextItem>
            <TextItem tabs={1}>
                Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> <KeyboardIcon src={KeyboardSpace} height={18} /> недоступні під час автоматичного виконання алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> <KeyboardIcon src={KeyboardArrowUp}/> <KeyboardIcon src={KeyboardArrowDown}/> 
                можна зажати.
            </TextItem>

            <HorizontalLine/>

            <TextItem>Кольори:</TextItem>
            <TextItem tabs={1}>
                <ColorBox color={TreeBasedConstants.regularColor[1]}/> - Звичайний елемент
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={TreeBasedConstants.checkingColor}/> - Порівняння
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={TreeBasedConstants.visitedColor[1]}/> - Зміна \ Переглянутий елемент в обході
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={TreeBasedConstants.addedColor}/> - Правильна позиція після виконання підфункції
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={TreeBasedConstants.doneColor[1]}/> - Відсортований елемент
            </TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Згенерувати нове дерево\масив (на клавіатурі це клавіша "Space") можна також нажавши на повзунок розміру дерева\масиву (без пересування).</TextItem>
            <TextItem tabs={1}>
                Тривалість кроку використовується лише в автоматичному режимі. Ви можете змінювати її навіть під час виконання алгоритму.
            </TextItem>
        </>
    );
}

export default GeneralInfo;