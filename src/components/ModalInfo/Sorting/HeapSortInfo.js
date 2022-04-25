import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function HeapSortInfo() {
    return (
        <>
            <TextItem>
                Пірамідальне сортування (Heapsort, Сортування купою) використовує двійкову купу.
                Двійкова купа (англ. binary heap) — це двійкове дерево, 
                у якому значення в будь-якій вершині не менші за значення їхніх нащадків.
            </TextItem>

            <TextItem>
                Докладніше цей алгоритм можна розглянути на сторінці алгоритмів на деревах.
            </TextItem>

            <TextItem>
                У цій реалізації алгоритму вважаємо дерево наперед побудованим, і його потрібно перетворити у двійкову купу за допомогою процедури просіювання вниз.
            </TextItem>

            <TextItem>
                    <div>Складність алгоритму - O(n ∙ log(n)).</div>
            </TextItem>
            
            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму пірамідального сортування:</TextItem>
            <TextItem tabs={1}>{"1. Повторювати крок 2 при i=n/2-1,n/2-2,...,0"}</TextItem>
            <TextItem tabs={2}>{"2. Виконати процедуру просіювання вниз із такими параметрами: n та i"}</TextItem>
            <TextItem tabs={1}>{"3. Повторювати кроки 4-5 при i=n-1,n-2,...,1"}</TextItem>
            <TextItem tabs={2}>{"4. Переставити місцями елементи A[0] <—> A[i] (Розміщення найбільшого елементу в кінець масиву)"}</TextItem>
            <TextItem tabs={2}>{"5. Виконати процедуру просіювання вниз із такими параметрами: i (кількість елементів в дереві) та 0 (індекс елемента для просіювання)"}</TextItem>
            
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму просіювання вниз:</TextItem>
            <TextItem tabs={1}>{"Параметри: n - кількість елементів у дереві, i - індекс елемента для просіювання"}</TextItem>
            <TextItem tabs={1}>{"1. Присвоїти: largest = i; l = 2i+1 (лівий син); r = 2i+2 (правий син)"}</TextItem>
            <TextItem tabs={1}>{"2. Якщо l < n && A[l] > A[largest], то присвоїти largest =  l"}</TextItem>
            <TextItem tabs={1}>{"3. Якщо r < n && A[r] > A[largest], то присвоїти largest = r"}</TextItem>
            <TextItem tabs={1}>{
                `4. Якщо largest != i, то переставити місцями елементи A[largest] <—> A[i] 
                та виконати процедуру просіювання вниз із такими параметрами: n, largest`
            }</TextItem>
        </>
    );
}

export default HeapSortInfo;