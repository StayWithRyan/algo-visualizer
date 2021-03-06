import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function OptimizedNaiveInfo() {
    return (
        <>
            <TextItem>
                Це оптимізація алгоритму прямого пошуку.
            </TextItem>
            <TextItem>
                <b>Цей алгоритм застосовують лише коли всі символи зразка різні!!! </b> 
                Ви можете використати його, коли є однакові символи, тоді результат може бути неправильним!
                Приклад зразка та тексту, що спричиняє помилку: 
                "<span style={{userSelect: "text"}}>abadon</span>" та "<span style={{userSelect: "text"}}>ababadondon</span>".
            </TextItem>
            <TextItem>
                Коли всі символи зразка різні, то можна зсунути шаблон більш ніж на 1.
                Якщо невідповідність виникає після j збігів,
                то перший символ зразка не буде відповідати j відповідним символам тексту, оскільки всі його символи різні.
                Отже, завжди можна перемістити шаблон на j, не пропускаючи жодних дійсних зрушень.
            </TextItem>
            <TextItem>
                Складність алгоритму - O(2*n ≈ n), де n — довжина тексту. 
                Вона пояснюється тим, що кожен елемент тексту буде порівнюватися максимум 2 рази, при найгіршому випадку.
            </TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму оптимізованого прямого пошуку (n — довжина тексту, m — довжина зразка):</TextItem>
            <TextItem tabs={1}>1. Присвоїти i=0</TextItem>
            <TextItem tabs={1}>
                2. Перевірити чи міститься зразок у тексті за індексом i, по черзі порівнявши всі символи.
                Якщо зразок знайдено, то алгоритм завершено
            </TextItem>
            <TextItem tabs={1}>
                3. Якщо кількість зібігів дорівнює 0, то присвоїти i = i+1, інакше присвоїти i = i+j, де j це кількість збігів
            </TextItem>
            <TextItem tabs={1}>{`
                4. Якщо i <= n-m, перейти до кроку 2, інакше алгоритм завершено, зразок не знайдено`}
            </TextItem>
        </>
    );
}

export default OptimizedNaiveInfo;

