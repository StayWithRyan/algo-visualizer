import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"
import KeyboardIcon from "../KeyboardIcon"
import ColorBox from "../ColorBox"
import PlayBarInfo from "../GeneralInfo/PlayBarInfo"
import KeyboardInfo from "../GeneralInfo/KeyboardInfo"

import KeyboardArrowRight from '../../../icons/arrow-right.png';

import SearchingConstants from "../../../screens/StringsearchingPage/constants";

function GeneralInfo() {
    return (
        <>
            <PlayBarInfo/>
            <HorizontalLine/>
            <KeyboardInfo/>
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
                (лише в алгоритмі Рабіна - Карпа) \ Препроцесінг стрічки (у всіх інших алгоритмах)
            </TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Щоби розпочати роботу потрібно ввести "Зразок для пошуку" та "Текст".
                Також довжина "Тексту" має бути більшою за довжину "Зразка для пошуку", або такою ж.
            </TextItem>
            <TextItem tabs={1}>Неможливо розпочати виконання алгоритму клавішею <KeyboardIcon src={KeyboardArrowRight}/>,
                якщо поле для вводу активне
            </TextItem>
            <TextItem tabs={1}>Щоби розпочати роботу з новим алгоритмом, достатньо його вибрати. 
                Після цього одразу можете виконувати його.
            </TextItem>
            <TextItem tabs={1}>
                Тривалість кроку використовується лише в автоматичному режимі. Ви можете змінювати її навіть під час виконання алгоритму.
            </TextItem>
        </>
    );
}

export default GeneralInfo;