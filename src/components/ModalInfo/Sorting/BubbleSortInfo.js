import TextItem from "../TextItem"

function BubbleSortInfo() {
    return (
        <>
            <TextItem><div>Ефективність алгоритму - O(n<sup>2</sup>)</div></TextItem>
            <TextItem><u>Покроковий опис алгоритму сортування бульбашкою:</u></TextItem>
            <TextItem tabs={1}>{"1. Повторювати крок 2 при i=1..n-1"}</TextItem>
            <TextItem tabs={2}>{"2. Повторювати крок 3 при j=0..n-i"}</TextItem>
            <TextItem tabs={3}>{"3. Якщо A[j] > A[j+1], то переставити місцями елементи A[j] <-> A[j+1]"}</TextItem>
            <TextItem tabs={1}>{"4. Кінець"}</TextItem>
        </>
    );
}

export default BubbleSortInfo;