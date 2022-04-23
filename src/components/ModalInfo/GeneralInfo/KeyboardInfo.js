import TextItem from "../TextItem"
import KeyboardIcon from "../KeyboardIcon"

import KeyboardArrowRight from '../../../icons/arrow-right.png';
import KeyboardArrowLeft from '../../../icons/arrow-left.png';
import KeyboardArrowUp from '../../../icons/arrow-up.png';
import KeyboardArrowDown from '../../../icons/arrow-down.png';
import KeyboardEnter from '../../../icons/enter.png';
import KeyboardBackspace from '../../../icons/backspace.png';
import KeyboardSpace from '../../../icons/space.png';

function KeyboardInfo({withSpace, isTree}) {

    return (
        <>
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
                <KeyboardIcon src={KeyboardBackspace}/>(Backspace) — Запустити\зупинити автоматичне виконання алгоритму в протилежну сторону.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowUp}/>(Стрілка вверх) — Збільшити тривалість кроку автоматичного виконання.
            </TextItem>
            <TextItem tabs={1}>
                <KeyboardIcon src={KeyboardArrowDown}/>(Стрілка вниз) — Зменшити тривалість кроку автоматичного виконання.
            </TextItem>
            {
                !withSpace && 
                <>
                    <TextItem tabs={1}>
                        Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> недоступні під час автоматичного виконання алгоритму.
                    </TextItem>
                    <TextItem tabs={1}>
                        Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> <KeyboardIcon src={KeyboardArrowUp}/> <KeyboardIcon src={KeyboardArrowDown}/> 
                        можна зажати.
                    </TextItem>
                </>
            }
            {
                withSpace && 
                <>
                    <TextItem tabs={1}>
                        <KeyboardIcon src={KeyboardSpace} height={18} /> {isTree? "(Space) — Згенерувати новe дерево\\масив." : "(Space) — Згенерувати новий масив."}
                    </TextItem>
                    <TextItem tabs={1}>
                        Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> <KeyboardIcon src={KeyboardSpace} height={18} /> недоступні під час автоматичного виконання алгоритму.
                    </TextItem>
                    <TextItem tabs={1}>
                        Клавіші <KeyboardIcon src={KeyboardArrowRight}/> <KeyboardIcon src={KeyboardArrowLeft}/> <KeyboardIcon src={KeyboardArrowUp}/> <KeyboardIcon src={KeyboardArrowDown}/> 
                        можна зажати.
                    </TextItem>
                </>
            }
        </>
    );
}

export default KeyboardInfo;