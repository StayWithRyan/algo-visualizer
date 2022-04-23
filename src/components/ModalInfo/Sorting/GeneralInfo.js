import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"
import ColorBox from "../ColorBox"
import PlayBarInfo from "../GeneralInfo/PlayBarInfo"
import KeyboardInfo from "../GeneralInfo/KeyboardInfo"

import SortingConstants from "../../../screens/SortingPage/constants";

function GeneralInfo() {
    return (
        <>
            <PlayBarInfo/>
            <HorizontalLine/>
            <KeyboardInfo withSpace={true}/>
            <HorizontalLine/>

            <TextItem>Кольори:</TextItem>
            <TextItem tabs={1}>
                <ColorBox color={SortingConstants.defaultColor}/> - Звичайний елемент масиву
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={SortingConstants.checkingColor}/> - Порівняння
            </TextItem>
            <TextItem tabs={1}>
                <ColorBox color={SortingConstants.swappingColor}/> - Зміна
            </TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Щоби розпочати роботу з новим алгоритмом, достатньо його вибрати. 
                Після цього одразу можете виконувати його. Не забудьте лише згенерувати новий масив, в разі потреби.
            </TextItem>
            <TextItem tabs={1}>Згенерувати новий масив (на клавіатурі це клавіша "Space") можна також нажавши на повзунок розміру масиву (без пересування).</TextItem>
            <TextItem tabs={1}>
                Тривалість кроку використовується лише в автоматичному режимі. Ви можете змінювати її навіть під час виконання алгоритму.
            </TextItem>
        </>
    );
}

export default GeneralInfo;