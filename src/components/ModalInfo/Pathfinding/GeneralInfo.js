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
import PathfindingConstants from "../../../screens/PathfindingPage/constants";

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
                <ColorBox color={PathfindingConstants.blockColor[1]}/> - Стіна (блок)
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={PathfindingConstants.checkingColor[1]}/> - Хвиля пошуку шляху
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={PathfindingConstants.pathColor[1]}/> - Знайдений шлях
            </TextItem>

            <HorizontalLine/>

            <TextItem>Можливості:</TextItem>
            <TextItem tabs={1}>Ви можете створювати\видаляти стіни власноруч, використовуючи мишку.</TextItem>
            <TextItem tabs={1}>Ви можете пересувати точки старту і кінця.</TextItem>

            <HorizontalLine/>

            <TextItem>Інформація про алгоритми:</TextItem>
            <TextItem tabs={1}>В алгоритмах поле розглядається як граф, кожна вершина якого має до чотирьох сусідів: зверху, справа, знизу і зліва. 
                Якщо алгоритм потребує ваги між вершинами - кожна вага дорівнює 1. 
            </TextItem>
            <TextItem tabs={1}>Усі алгоритми пошуку потребують додаткової пам'яті, оскльіки потрібно зберігати шлях просування.</TextItem>
            <TextItem tabs={1}>"Пошук у глибину" та "А*" гарантують найкоротший шлях, "Пошук у ширину" та "Жадібний пошук найкращий - перший" - не гарантують.</TextItem>
            <TextItem tabs={1}>"А*" та "Жадібний пошук найкращий - перший" знають місцерозташування кінцевої точки і враховують це, інші ж ні.</TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Ви моете згенерувати лабіринт. Генерація алгоритму триває декілька секунд, ви моете пропустити очікування,
                нажавши на кнопку "Зупинити анімацію", яка появиться замість кнопки "Згенерувати лабіринт".
            </TextItem>
            <TextItem tabs={1}>Якщо ви змінюєте поле, прогрес алгоритму припиняється.</TextItem>
            <TextItem tabs={1}>
                Тривалісь кроку використовується лише в автоматичному режимі. Ви можете змінювати її навіть під час виконання алгоритму.
            </TextItem>
        </>
    );
}

export default GeneralInfo;