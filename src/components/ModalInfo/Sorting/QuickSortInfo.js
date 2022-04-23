import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function QuickSortInfo() {
    return (
        <>
            <TextItem>
                Ідея алгоритму полягає в перестановці елементів масиву так, щоби його можна було розділити
                на дві частини й кожний елемент із першої частини був не більший за будь-який елемент із другої.
                Впорядкування кожної з частин відбувається рекурсивно.
            </TextItem>
            <TextItem>
                Опорний елемент (pivot) у цій реалізації алгоритму вибирається завжди як останній елемент масиву.
            </TextItem>
            
            <TextItem><div>Середня складність - O(n ∙ log(n)), у найгіршому випадку Ω(n<sup>2</sup>).</div></TextItem>
            
            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму швидкого сортування:</TextItem>
            <TextItem tabs={1}>{"1. Присвоїти low = 0; high = n-1"}</TextItem>
            <TextItem tabs={1}>{"2. Якщо low >= high, то завершити виконання алгоритму"}</TextItem>
            <TextItem tabs={1}>{"3. Присвоїти pivot = A[high]"}</TextItem>
            <TextItem tabs={1}>{"4. Присвоїти i  = low-1"}</TextItem>
            <TextItem tabs={1}>{"5. Повторювати крок 6 при j=low,low+1,...,high-1"}</TextItem>
            <TextItem tabs={2}>{"6. Якщо A[j] < pivot, то  перейти до кроку 7"}</TextItem>
            <TextItem tabs={3}>{"7. Присвоїти i = i+1. Якщо i != j, то переставити місцями елементи A[i] <—> A[j]"}</TextItem>
            <TextItem tabs={1}>{"8. Якщо i+1 != high, то переставити місцями елементи A[i+1] <—> A[high]"}</TextItem>
            <TextItem tabs={1}>{"9. Присвоїти pivotIndex = i + 1"}</TextItem>
            <TextItem tabs={1}>{"10. Рекурсивно виконати сортування лівої частини масиву: Розпочати цей алгоритм сортування з 2 кроку, прийнявши low = low; high = pivotIndex - 1"}</TextItem>
            <TextItem tabs={1}>{"11. Рекурсивно виконати сортування правої частини масиву: Розпочати цей алгоритм сортування з 2 кроку, прийнявши low = pivotIndex + 1; high = high"}</TextItem>
        </>
    );
}

export default QuickSortInfo;