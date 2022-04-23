import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"
import ColorBox from "../ColorBox"
import PlayBarInfo from "../GeneralInfo/PlayBarInfo"
import KeyboardInfo from "../GeneralInfo/KeyboardInfo"

import PathfindingConstants from "../../../screens/PathfindingPage/constants";

function GeneralInfo() {
    return (
        <>
            <PlayBarInfo/>
            <HorizontalLine/>
            <KeyboardInfo/>
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
            <TextItem tabs={1}>Ви можете пересувати точки старту й кінця.</TextItem>

            <HorizontalLine/>

            <TextItem>Інформація про алгоритми:</TextItem>
            <TextItem tabs={1}>В алгоритмах поле розглядається як граф, кожна вершина якого має до чотирьох сусідів: зверху, справа, знизу і зліва. 
                Якщо алгоритм потребує ваги між вершинами - кожна вага дорівнює 1. 
            </TextItem>
            <TextItem tabs={1}>"Пошук у глибину" та "А*" гарантують найкоротший шлях, "Пошук у ширину" та "Жадібний пошук найкращий - перший" - не гарантують.</TextItem>
            <TextItem tabs={1}>"А*" та "Жадібний пошук найкращий - перший" знають місцерозташування кінцевої точки і враховують це, інші ж ні.</TextItem>

            <HorizontalLine/>

            <TextItem>Підказки:</TextItem>
            <TextItem tabs={1}>Генерація алгоритму триває декілька секунд, ви можете пропустити очікування,
                нажавши на кнопку "Зупинити анімацію", яка появиться замість кнопки "Згенерувати лабіринт".
            </TextItem>
            <TextItem tabs={1}>Якщо ви змінюєте поле, прогрес алгоритму припиняється.</TextItem>
            <TextItem tabs={1}>
                Тривалість кроку використовується лише в автоматичному режимі. Ви можете змінювати її навіть під час виконання алгоритму.
            </TextItem>
        </>
    );
}

export default GeneralInfo;