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

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai";

import Constants from "../../../constants";
import SearchingConstants from "../../../screens/StringsearchingPage/constants";

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
                <AiOutlineDoubleLeft size={iconSize} style={confBarIconStyle}/> — Запустити автоматичне виконання алгоритму у зворотню сторону.
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
                <KeyboardIcon src={KeyboardBackspace}/>(Backspace) — Запустити\зупинити автоматичне виконання алгоритму у зворотню сторону.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowUp}/>(Стрілка вверх) — Збільшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowDown}/>(Стрілка вниз) — Зменшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={1}>
                Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> недоступні під час автоматичного виконання алгоритму.
            </TextItem>
            <TextItem tabs={1}>
                Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> <KeyboardIcon src={KeyboardArrowUp}/> <KeyboardIcon src={KeyboardArrowDown}/> 
                можна зажати.
            </TextItem>

            <HorizontalLine/>

            <TextItem>Кольори:</TextItem>
            <TextItem tabs={1}>
                <ColorBox color={SearchingConstants.checkingColor}/> - Порівняння
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={SearchingConstants.matchColor}/> - Стрічку знайдено
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={SearchingConstants.noMatchColor}/> - Стрічку не вдалося знайти
            </TextItem>
            <TextItem tabs={1} nojustify={true}>
                <ColorBox color={SearchingConstants.checkingHashColor}/> - Взяття хешу 
                (лише у алгоритмі Рабіна - Карпа) \ Препроцесінг стрічки (у всіх інших алгоритмах)
            </TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Щоб розпочати роботу потрібно ввести "Зразок для пошуку" та "Текст".
                Також довжина "Тексту" має бути більшою за довжину "Зразка для пошуку", або такою ж.
            </TextItem>
            <TextItem tabs={1}>Неможливо розпочати виконання алгоритму за допомогою клавіші <KeyboardIcon src={KeyboardArrowRight}/>,
                якщо поле для вводу активне
            </TextItem>
            <TextItem tabs={1}>Щоб розпочати роботу з новим алгоритмом, достатньо його обрати. 
                Після цього одразу можете виконувати його.
            </TextItem>
            <TextItem tabs={1}>
                Тривалісь кроку використовується лише в автоматичному режимі. Ви можете змінювати її навіть під час виконання алгоритму.
            </TextItem>
        </>
    );
}

export default GeneralInfo;