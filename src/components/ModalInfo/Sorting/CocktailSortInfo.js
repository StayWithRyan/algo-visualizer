import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function CocktailSortInfo() {
    return (
        <>
            <TextItem >
                Сортування змішуванням (англ. Cocktail sort) — один із різновидів алгоритму сортування бульбашкою. 
                Різниця в тому, що сортування відбувається в обох напрямках, міняючи його при кожному проході.
            </TextItem>

            <TextItem><div>Складність алгоритму - O(n<sup>2</sup>).</div></TextItem>

            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму сортування змішуванням:</TextItem>
            <TextItem tabs={1}><div>1. Присвоїти <i>swapped = true; start = 0; end = n-1</i></div></TextItem>
            <TextItem tabs={1}><div>2. Поки <i>swapped == true</i> повторювати кроки 3-10</div></TextItem>
            <TextItem tabs={2}>{"3. Присвоїти swapped = false"}</TextItem>
            <TextItem tabs={2}>{"4. Повторювати крок 5 при i=start,start+1,...,end-1"}</TextItem>
            <TextItem tabs={3}>{"5. Якщо A[i] > A[i+1], то переставити місцями елементи A[i] <—> A[i+1] та присвоїти swapped = true"}</TextItem>
            <TextItem tabs={2}>{"6. Якщо swapped == false, завершити виконання алгоритму"}</TextItem>
            <TextItem tabs={2}>{"7. Присвоїти swapped = false; end = end - 1"}</TextItem>
            <TextItem tabs={2}>{"8. Повторювати крок 9 при i=end-1,end-2,...,start"}</TextItem>
            <TextItem tabs={3}>{"9. Якщо A[i] > A[i+1], то переставити місцями елементи A[i] <—> A[i+1] та присвоїти swapped = true"}</TextItem>
            <TextItem tabs={2}>{"10. Присвоїти start = start + 1"}</TextItem>
        </>
    );
}

export default CocktailSortInfo;