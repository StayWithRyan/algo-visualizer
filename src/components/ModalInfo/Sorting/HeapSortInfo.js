import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function HeapSortInfo() {
    return (
        <>
            <TextItem>
                Сортування пірамідою (Heapsort, Сортування купою) використовує двійкову купу.
                Двійкова купа (англ. binary heap) — це структура даних, що є масивом, який можна розглядати як майже повне двійкове дерево.
            </TextItem>

            <TextItem>
                Детальніше даний алгоритм можете розглянути на сторінці алгоритмів на деревах.
            </TextItem>

            <TextItem>
                    <div>Складність алгоритму - O(n ∙ log(n)).</div>
            </TextItem>
            
            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму сортування пірамідою:</TextItem>
            <TextItem tabs={1}>{"S1. Повторювати крок S2 при i=n/2-1,n/2-2,...,0"}</TextItem>
            <TextItem tabs={2}>{"S2. Викликати процедуру просіювання вниз із наступними параметрами: n (кількість елементів в дереві) та i (індекс елемента для просіювання)"}</TextItem>
            <TextItem tabs={1}>{"S3. Повторювати кроки S4-S5 при i=n-1,n-2,...,1"}</TextItem>
            <TextItem tabs={2}>{"S4. Переставити місцями елементи A[0] <—> A[i] (Розміщення найбільшого елементу в кінець масиву)"}</TextItem>
            <TextItem tabs={2}>{"S5. Викликати процедуру просіювання вниз із наступними параметрами: i (кількість елементів в дереві) та 0 (індекс елемента для просіювання)"}</TextItem>
            
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму просіювання вниз:</TextItem>
            <TextItem tabs={1}>{"Параметри: n - кількість елементів в дереві, i - індекс елемента для просіювання"}</TextItem>
            <TextItem tabs={1}>{"H1. Присвоїти: largest = i; l = 2i+1 (лівий син); r = 2i+2 (правий син)"}</TextItem>
            <TextItem tabs={1}>{"H2. Якщо l < n && A[l] > A[largest], то присвоїти largest =  l"}</TextItem>
            <TextItem tabs={1}>{"H3. Якщо r < n && A[r] > A[largest], то присвоїти largest = r"}</TextItem>
            <TextItem tabs={1} style={{marginBottom: "0"}}>{
                `H4. Якщо largest != i, то переставити місцями елементи A[largest] <—> A[i] 
                та викликати процедуру просіювання вниз із наступними параметрами: n (кількість елементів в дереві), largest (індекс елемента для просіювання)`
            }</TextItem>
        </>
    );
}

export default HeapSortInfo;