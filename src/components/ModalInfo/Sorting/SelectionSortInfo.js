import TextItem from "../TextItem"

function SelectionSortInfo() {
    return (
        <>
            <TextItem>
            Алгоритм працює таким чином - На кожному кроці проходження алгоритму шукається найбільше значення із невідсортованого масиву і розміщається на своє місце. 
            </TextItem>
            <TextItem><div>Ефективність алгоритму - O(n(n-1)/2 ≈ n<sup>2</sup>) </div></TextItem>
            <TextItem><u>Покроковий опис алгоритму сортування вибором:</u></TextItem>
            <TextItem tabs={1}>{"1. Повторювати крок 2 при i=n-1,n-2,...,1"}</TextItem>
            <TextItem tabs={2}>{"2. Присвоїти max_index <— 0"}</TextItem>
            <TextItem tabs={2}>{"3. Повторювати крок 4 при j=1,2,...,i"}</TextItem>
            <TextItem tabs={3}>{"4. Якщо A[j] > A[max_index], то присвоїти max_index <— j"}</TextItem>
            <TextItem tabs={2} style={{marginBottom: "0"}}>{"5. Переставити місцями елементи A[i] <—> A[max_index]"}</TextItem>
        </>
    );
}

export default SelectionSortInfo;