import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function InsertionSortInfo() {
    return (
        <>
            <TextItem>
                На кожному кроці алгоритму вибирається один з елементів вхідних даних 
                і вставляється на потрібну позицію у вже відсортованому списку доти, доки набір вхідних даних не буде вичерпано.
            </TextItem>

            <TextItem><div>Складність алгоритму - O(n<sup>2</sup>).</div></TextItem>
                
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму сортування включенням:</TextItem>
            <TextItem tabs={1}>{"1. Повторювати кроки 2-3 при i=1,2,...,n-1"}</TextItem>
            <TextItem tabs={2}>{"2. Присвоїти key = i"}</TextItem>
            <TextItem tabs={2}>{"3. Повторювати крок 4 при j=i-1,i-2,...,0"}</TextItem>
            <TextItem tabs={3}>{"4. Якщо A[j] > A[key], то перейти до кроку 5, інакше перейти до наступної ітерації кроку 1"}</TextItem>
            <TextItem tabs={4}>{"5. Переставити місцями елементи A[j] <—> A[key], та присвоїти key = j"}</TextItem>
        </>
    );
}

export default InsertionSortInfo;