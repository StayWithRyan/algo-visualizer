import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function BestFirstSearchInfo() {
    return (
        <>
            <TextItem>
                Жадібний пошук "Найкращий - перший" (англ. Greedy Best First Search) - алгоритм, що дуже схожий на А*.
                Адже за основу обидва алгоритми мають пошук у ширину, з розумним вибором наступної вершини з черги.
            </TextItem>
            
            <TextItem>
                Відмінність від алгоритму А* - наступна вершина вибирається така, яка має мінімальне значення h(x), де 
                h(x) - евристична функція (така ж, як і у А*), що оцінює вартість шляху від вершини x до кінцевої.
            </TextItem>
            
            <TextItem>
                <b>Не гарантує найкоротшого шляху.</b>
            </TextItem>
            
            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму жадібного пошуку "Найкращий - перший":</TextItem>
            <TextItem tabs={1}>{"1. Створити масив для зберігання відвіданих вершин"}</TextItem>
            <TextItem tabs={1}>{"2. Створити пусту чергу. Добавити в чергу початкову вершину"}</TextItem>
            <TextItem tabs={1}>{"3. Поки черга не пуста, повторювати кроки 4-10:"}</TextItem>
            <TextItem tabs={2}>{"4. Взяти з черги елемент, який має найменше значення функції h(x) та присвоїти його в змінну current"}</TextItem>
            <TextItem tabs={2}>{"5. Добавити current в список відвіданих вершин"}</TextItem>
            <TextItem tabs={2}>{"6. Якщо current це кінцева вершина - завершити виконання. Шлях знайдено"}</TextItem>
            <TextItem tabs={2}>{`7. Якщо current має невідвідану вершину зверху,
                то добавити її в кінець черги`
            }</TextItem>
            <TextItem tabs={2}>{`8. Якщо current має невідвідану вершину справа,
                то добавити її в кінець черги`
            }</TextItem>
            <TextItem tabs={2}>{`9. Якщо current має невідвідану вершину знизу,
                то добавити її в кінець черги`
            }</TextItem>
            <TextItem tabs={2}>{`10. Якщо current має невідвідану вершину зліва,
                то добавити її в кінець черги`
            }</TextItem>
            <TextItem tabs={1}>{`11. Алгоритм завершено, шляху немає`}</TextItem>
        </>
    );
}

export default BestFirstSearchInfo;