import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"
import ColorBox from "../ColorBox"
import PlayBarInfo from "../GeneralInfo/PlayBarInfo"
import KeyboardInfo from "../GeneralInfo/KeyboardInfo"

import TreeBasedConstants from "../../../screens/TreeBasedPage/constants";

function GeneralInfo() {
    return (
        <>
            <PlayBarInfo/>
            <HorizontalLine/>
            <KeyboardInfo withSpace={true} isTree={true}/>
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