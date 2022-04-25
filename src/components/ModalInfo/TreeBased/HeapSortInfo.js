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
                Щоби побудувати двійкову купу (яку також називають пірамідою, звідки й пішла назва алгоритму), розпочнемо з пустого дерева.
                По черзі кожен елемент масиву будемо добавляти в кінець дерева, виконуючи після цього процедуру просіювання вверх.
                Якщо добавити новий елемент у кінець дерева, то ламається двійкова купа 
                (а саме умова: значення в будь-якій вершині не менші за значення їхніх нащадків).
                Проте, якщо виконати процедуру просіювання вверх, двійкова купа відбудується.
            </TextItem>
            
            <TextItem>
                З визначення двійкової купи випливає, що корінь дерева має найбільше значення з усього дерева.
                Тому на цьому кроці міняється місцями останній елемент дерева та його корінь.
                Тепер останній елемент дерева - найбільший, і вважається відсортованим, тому вилучаємо його з дерева.
                Оскільки минулий останній елемент дерева тепер став коренем, знову ламається двійкова купа.
                Проте, виконавши процедуру просіювання вниз над кореневим елементом, двійкова купа відбудується знову.
            </TextItem>
            <TextItem>
                Цей алгоритм базується на двох процедурах: просіювання вверх та просіювання вниз (англ. heapify).
                Вони виконуються коли порушено умову двійкової купи, і потрібно заново її побудувати.
            </TextItem>
            <TextItem>
                    <div>Складність алгоритму - O(n ∙ log(n)).</div>
            </TextItem>
            
            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму пірамідального сортування:</TextItem>
            <TextItem tabs={1}>{"1. Повторювати крок 2-3 при i=0,1,...,n-1"}</TextItem>
            <TextItem tabs={2}>{"2. Добавити елемент масиву за індексом i у кінець дерева"}</TextItem>
            <TextItem tabs={2}>{"3. Просіяти вверх щойно доданий (останній) елемент"}</TextItem>
            <TextItem tabs={1}>{"4. Повторювати кроки 5-7 при i=n-1,n-2,...,1"}</TextItem>
            <TextItem tabs={2}>{"5. Переставити місцями кореневу вершину і останню (Розміщення найбільшого елементу в кінець)"}</TextItem>
            <TextItem tabs={2}>{"6. Помітити останній елемент як відсортований, і видалити його з дерева (забути про існування)"}</TextItem>
            <TextItem tabs={2}>{"7. Виконати процедуру просіювання вниз для кореня"}</TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму просіювання вниз:</TextItem>
            <TextItem tabs={1}>{"1. Присвоїти вершину, яку потрібно просіяти, у змінну largest"}</TextItem>
            <TextItem tabs={1}>{"2. Якщо лівий син вершини більший за largest, то присвоїти його в змінну largest"}</TextItem>
            <TextItem tabs={1}>{"3. Якщо правий син вершини більший за largest, то присвоїти його в змінну largest"}</TextItem>
            <TextItem tabs={1}>{
                `4. Якщо відбувся крок 2 або 3, то переставити місцями вершину, яку потрібно просіяти, із вершиною, що у змінній largest,
                та виконати процедуру просіювання вниз для вершини largest`
            }</TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму просіювання вверх:</TextItem>
            <TextItem tabs={1}>{"1. Якщо у вершини, яку потрібно просіяти, немає батька - завершити алгоритм"}</TextItem>
            <TextItem tabs={1}>{"2. Якщо в батька вершини значення більше, або таке ж - завершити алгоритм"}</TextItem>
            <TextItem tabs={1}>{"3. Переставити місцями значення вершини і її батька"}</TextItem>
            <TextItem tabs={1}>{"3. Виконати процедуру просіювання вверх для батька"}</TextItem>
        </>
    );
}

export default HeapSortInfo;