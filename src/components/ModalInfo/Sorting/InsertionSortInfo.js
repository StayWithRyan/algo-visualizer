import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function InsertionSortInfo() {
    return (
        <>
            <TextItem>
                На кожному кроці алгоритму ми вибираємо один з елементів вхідних даних 
                і вставляємо його на потрібну позицію у вже відсортованому списку доти, доки набір вхідних даних не буде вичерпано.
            </TextItem>

            <TextItem><div>Ефективність алгоритму - O(n<sup>2</sup>)</div></TextItem>
                
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму сортування включенням:</TextItem>
            <TextItem tabs={1}>{"1. Повторювати кроки 2-3 при i=1,2,...,n-1"}</TextItem>
            <TextItem tabs={2}>{"2. Присвоїти key <— i"}</TextItem>
            <TextItem tabs={2}>{"3. Повторювати крок 4 при j=i-1,i-2,...,0"}</TextItem>
            <TextItem tabs={3}>{"4. Якщо A[j] > A[key], то перейти до кроку 5, інакше перейти до наступної ітерації кроку 1"}</TextItem>
            <TextItem tabs={4} style={{marginBottom: "0"}}>{"5. Переставити місцями елементи A[j] <—> A[k], та присвоїти key <— j"}</TextItem>
        </>
    );
}

export default InsertionSortInfo;