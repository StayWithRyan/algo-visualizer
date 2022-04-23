import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function NaiveInfo() {
    return (
        <>
            <TextItem>
                Прямий пошук, або примітивний алгоритм пошуку стрічки (англ. Naive string search algorithm) —
                найпростіший алгоритм, що розв'язує задачу знаходження розташування стрічки в тексті.
                Алгоритм не є ефективним, але він не потребує додаткової пам'яті.
            </TextItem>
            <TextItem>Ідея полягає в послідовній перевірці всіх можливих початкових зсувів.</TextItem>
            <TextItem>Складність алгоритму - O(n*m), де n — довжина тексту, m — довжина зразка.</TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму прямого пошуку:</TextItem>
            <TextItem tabs={1}>1. Повторювати крок 2 при i=0,1,...,n-m</TextItem>
            <TextItem tabs={2}>
                2. Перевірити чи міститься зразок у тексті за індексом i, по черзі порівнявши всі символи.
                Якщо зразок знайдено, то алгоритм завершено
            </TextItem>
            <TextItem tabs={1}>
                3. Алгоритм завершено, зразок не знайдено
            </TextItem>
        </>
    );
}

export default NaiveInfo;

