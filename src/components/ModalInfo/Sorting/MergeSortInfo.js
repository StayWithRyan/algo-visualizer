import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function MergeSortInfo() {
    return (
        <>
            <TextItem>
                Сортування злиттям (англійською «Merge Sort») — алгоритм сортування, в основі якого лежить принцип «розділяй та володарюй» 
                В основі цього способу сортування лежить злиття двох упорядкованих ділянок масиву в одну впорядковану ділянку іншого масиву
            </TextItem>

            <TextItem><div>Ефективність алгоритму - O(n ∙ log(n))</div></TextItem>
            
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму сортування злиттям:</TextItem>
            <TextItem tabs={1}>{"S1. Присвоїти l <— 0; r <— n-1"}</TextItem>
            <TextItem tabs={1}>{"S2. Якщо l >= r, то завершити виконання алгоритму"}</TextItem>
            <TextItem tabs={1}>{"S3. Присвоїти m <— l+((r-l)/2)"}</TextItem>
            <TextItem tabs={1}>{"S4. Виконати сортування лівої частини масиву: Розпочати даний алгоритм сортування з S2 кроку, прийнявши l <— l; r <— m"}</TextItem>
            <TextItem tabs={1}>{"S5. Виконати сортування правої частини масиву: Розпочати даний алгоритм сортування з S2 кроку, прийнявши l <— m+1; r <— r"}</TextItem>
            <TextItem tabs={1}>{"S6. Викликати процедуру злиття двох частин із даними l, m, r (На даному кроці ліва і права частини алгоритму відсортовані)"}</TextItem>
            
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму злиття двох частин масиву:</TextItem>
            <TextItem tabs={1}>{"M1. Створити пустий тимчасовий масив - A_tmp"}</TextItem>
            <TextItem tabs={1}>{"M2. Присвоїти i <— 0 (індекс для підмасиву L); j <— 0 (індекс для підмасиву R); n1 <— m-l+1 (розмір масиву L); n2 <— r-m (розмір масиву R)"}</TextItem>
            <TextItem tabs={1}>{"M3. Поки (i < n1 && j < n2) повторювати крок M4"}</TextItem>
            <TextItem tabs={2}>
                M4. Серед елементів A[l + i] (підмасив L з індексом i) та A[m + 1 + j] (підмасив R з індексом j) вибрати менший елемент та занести у масив A_tmp, 
                збільшити індекс вибраного елемента (i або j).
            </TextItem>
            <TextItem tabs={1}>{"M5. В масив A_tmp занести елементи підмасиву L, що залишились"}</TextItem>
            <TextItem tabs={1}>{"M6. В масив A_tmp занести елементи підмасиву R, що залишились"}</TextItem>
            <TextItem tabs={1} style={{marginBottom: "0"}}>{"M7. Дані масиву A_tmp послідновно присвоїти основному масиву A, починаючи з індекса l"}</TextItem>

        </>
    );
}

export default MergeSortInfo;