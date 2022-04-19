import TextItem from "../TextItem"

function SelectionSortInfo() {
    return (
        <>
            <TextItem><div>Ефективність алгоритму - O(n<sup>2</sup>)</div></TextItem>
            <TextItem><u>Покроковий опис алгоритму сортування бульбашкою:</u></TextItem>
            <TextItem tabs={1}>{"1. Цикл за індексом проходження. Повторювати кроки S2 - S 4  при i=1..n-1."}</TextItem>
            <TextItem tabs={1}>{"2. Зафіксувати перший поточний елемент: встановити R0 = Ri."}</TextItem>
            <TextItem tabs={1}>{"3. Якщо A[j] > A[j+1], то переставити місцями елементи A[j] <-> A[j+1]"}</TextItem>
            <TextItem tabs={1}>{"4. Перестановка елементів. Якщо min Rj < R0 та j !=i , то min Rj <-> R0."}</TextItem>
            <TextItem tabs={1}>{"5. Кінець. Вихід."}</TextItem>
        </>
    );
}

export default SelectionSortInfo;