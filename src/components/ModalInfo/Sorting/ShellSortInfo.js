import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function ShellSortInfo() {
    return (
        <>
            <TextItem>
                Сортування Шелла — це алгоритм сортування, що є узагальненням сортування включенням.
                Він виконує декілька впорядкувань включенням, кожен раз порівнюючи й переставляючи елементи,
                що розташовані на різній відстані один від одного (кожного кроку ця відстань зменшується).
            </TextItem>

            <TextItem><div>Середня складність - O(n<sup>1.5</sup>), у найгіршому випадку Ω(n<sup>2</sup>).</div></TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму сортування Шелла:</TextItem>
            <TextItem tabs={1}>{"1. Присвоїти gap = n/2"}</TextItem>
            <TextItem tabs={1}>{"2. Повторювати крок 3 при i=gap,gap+1,...,n-1"}</TextItem>
            <TextItem tabs={2}>{"3. Повторювати крок 4 при j=i,i-gap,...,gap"}</TextItem>
            <TextItem tabs={3}>{"4. Якщо A[j-gap] > A[j], то переставити місцями елементи A[j-gap] <—> A[j], інакше перейти до наступної ітерації кроку 2"}</TextItem>
            <TextItem tabs={1}>{"5. Присвоїти gap = gap/2 (привести до цілого числа). Якщо gap > 0, то перейти до кроку 2, інакше завершити виконання алгоритму"}</TextItem>
        </>
    );
}
export default ShellSortInfo;