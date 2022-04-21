import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function SelectionSortInfo() {
    return (
        <>
            <TextItem>
                На кожному кроці проходження алгоритму шукається найбільше значення із невідсортованого масиву і міняється місцями з поточним останнім елементом. 
            </TextItem>
            
            <TextItem>Складність алгоритму - O(n(n-1)/2).</TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму сортування вибором:</TextItem>
            <TextItem tabs={1}>{"1. Повторювати кроки 2-5 при i=n-1,n-2,...,1"}</TextItem>
            <TextItem tabs={2}>{"2. Присвоїти max_index = 0"}</TextItem>
            <TextItem tabs={2}>{"3. Повторювати крок 4 при j=1,2,...,i"}</TextItem>
            <TextItem tabs={3}>{"4. Якщо A[j] > A[max_index], то присвоїти max_index = j"}</TextItem>
            <TextItem tabs={2}>{"5. Переставити місцями елементи A[i] <—> A[max_index]"}</TextItem>
        </>
    );
}

export default SelectionSortInfo;