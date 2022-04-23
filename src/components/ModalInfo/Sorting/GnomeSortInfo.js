import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function GnomeSortInfo() {
    return (
        <>
            <TextItem>
                Сортування гнома (англ. Gnome sort) — один із найпростіших алгоритмів сортування.
                Ім'я походить від голландського садового гнома, якого ставлять між квітковими горщиками.
                Якщо два сусідні від гнома горщики йдуть у правильному порядку, гном йде на одну позицію вперед.
                Якщо ж вони в неправильному порядку - міняє ці два горщики місцями і йде на одну позицію назад (щоби знову перевірити порядок).
            </TextItem>
            <TextItem>
                Алгоритм концептуально простий, і не потребує навіть вкладених циклів. 
            </TextItem>

            <TextItem>
                <div>Складність алгоритму - O(n<sup>2</sup>).</div>
            </TextItem>
            
            <HorizontalLine/>
            
            <TextItem>Покроковий опис алгоритму сортування гнома:</TextItem>
            <TextItem tabs={1}>{"1. Присвоїти index = 0"}</TextItem>
            <TextItem tabs={1}>{"2. Поки index < n повторювати крок 3"}</TextItem>
            <TextItem tabs={2}>{"3. Якщо index == 0 або A[index] >= A[index-1], то присвоїти index = index+1, інакше перейти до кроку 4"}</TextItem>
            <TextItem tabs={3}>{"4. Переставити місцями елементи A[index] <—> A[index-1] та присвоїти index = index-1"}</TextItem>
        </>
    );
}

export default GnomeSortInfo;