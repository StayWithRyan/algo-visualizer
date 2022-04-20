import TextItem from "../TextItem"

function BubbleSortInfo() {
    return (
        <>
            <TextItem>
                Алгоритм працює таким чином — у поданому наборі даних порівнюються два сусідні елементи.
                Якщо один з елементів, не відповідає критерію сортування,
                то ці два елементи міняються місцями. Прохід по наборі продовжується доти, доки дані не будуть відсортованими.         
            </TextItem>
            <TextItem><div>Ефективність алгоритму - O(n<sup>2</sup>)</div></TextItem>
            <TextItem><u>Покроковий опис алгоритму сортування бульбашкою:</u></TextItem>
            <TextItem tabs={1}>{"1. Повторювати крок 2 при i=1,2,...,n-1"}</TextItem>
            <TextItem tabs={2}>{"2. Повторювати крок 3 при j=0,1,...,n-i-1"}</TextItem>
            <TextItem tabs={3} style={{marginBottom: "0"}}>{"3. Якщо A[j] > A[j+1], то переставити місцями елементи A[j] <—> A[j+1]"}</TextItem>
        </>
    );
}

export default BubbleSortInfo;