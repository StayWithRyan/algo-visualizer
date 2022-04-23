import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function DFSInfo() {
    return (
        <>
            <TextItem>
                Алгоритм починається з довільної вершини і здійснює обхід у максимально можливу глибину до переходу на наступну вершину.
            </TextItem>

            <TextItem><b>Не гарантує найкоротшого шляху.</b></TextItem>
            
            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму пошуку в глибину:</TextItem>
            <TextItem tabs={1}>{"1. Створити масив для зберігання відвіданих вершин"}</TextItem>
            <TextItem tabs={1}>{"2. Присвоїти current початкову вершину"}</TextItem>
            <TextItem tabs={1}>{"3. Добавити current в список відвіданих вершин"}</TextItem>
            <TextItem tabs={1}>{"4. Якщо current це кінцева вершина - завершити виконання. Шлях знайдено"}</TextItem>
            <TextItem tabs={1}>{`5. Якщо current має невідвідану вершину зверху,
                то присвоїти current цю вершину і перейти до 2 кроку`
            }</TextItem>
            <TextItem tabs={1}>{`6. Якщо current має невідвідану вершину справа,
                то присвоїти current цю вершину і перейти до 2 кроку`
            }</TextItem>
            <TextItem tabs={1}>{`7. Якщо current має невідвідану вершину знизу,
                то присвоїти current цю вершину і перейти до 2 кроку`
            }</TextItem>
            <TextItem tabs={1}>{`8. Якщо current має невідвідану вершину зліва,
                то присвоїти current цю вершину і перейти до 2 кроку`
            }</TextItem>
            <TextItem tabs={1}>{`9. Алгоритм завершено, шляху немає`}</TextItem>
        </>
    );
}

export default DFSInfo;