import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function OptimizedNaiveInfo() {
    return (
        <>
            <TextItem>
                Це оптимізація алгоритму прямого пошуку.
            </TextItem>
            <TextItem>
                <b>Даний алгоритм застосовують лише коли всі символи зразка різні!!! </b> 
                Ви можете використати його коли є однакові символи в зразка, але в такому випадку алгоритм може не знайти зразок, коли він є в тексті.
                Приклад зразка та тексту, при яких алгоритм помилиться: 
                "<span style={{userSelect: "text"}}>abadon</span>" та "<span style={{userSelect: "text"}}>ababadondon</span>".
            </TextItem>
            <TextItem>
                Коли всі символи зразка різні, ми можемо зсунути шаблон більш ніж на 1.
                Коли невідповідність виникає після j збігів, ми знаємо,
                що перший символ шаблону не буде відповідати j відповідним символам, оскільки всі символи шаблону різні.
                Таким чином, ми завжди можемо перемістити шаблон на j, не пропускаючи жодних дійсних зрушень.
            </TextItem>
            <TextItem>
                Складність алгоритму - O(2*n ≈ n), де n — довжина тексту. 
                Дана складність пояснюється тим, що кожен елемент тексту буде порівнюватися максимум 2 рази, при найгіршому випадку.
            </TextItem>

            <HorizontalLine/>

            <TextItem>Покроковий опис алгоритму оптимізованого прямого пошуку: (n — довжина тексту, m — довжина зразка):</TextItem>
            <TextItem tabs={1}>1. Присвоїти i=0</TextItem>
            <TextItem tabs={1}>
                2. Перевірити чи знаходиться зразок у тексті за індексом i, по черзі порівнявши всі символи.
                Якщо зразок знайдено, то алгоритм завершено.
            </TextItem>
            <TextItem tabs={1}>
                3. Якщо кількість зібігів дорівнює 0, то присвоїти i = i+1, інакше, присвоїти i = i+j, де j це кількість збігів.
            </TextItem>
            <TextItem tabs={1}>{`
                4. Якщо i <= N-M, перейти до кроку 2, інакше алгоритм завершено, зразок не знайдено.`}
            </TextItem>
        </>
    );
}

export default OptimizedNaiveInfo;

