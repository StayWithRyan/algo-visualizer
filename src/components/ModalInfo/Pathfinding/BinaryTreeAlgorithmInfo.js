import TextItem from "../TextItem"

function BinaryTreeAlgorithmInfo() {
    return (
        <>
            <TextItem>
                Повторює структуру бінарного дерева на лабіринті.
                На кожному кроці розглядається одна вершина, і випадковим чином вирішується, де поставити блок: зверху чи зліва.
            </TextItem>
            <TextItem>
                Даний алгоритм будує ідеальний лабіринт. Це такий лабіринт, де між будь-якими двома точками існує лише один шлях.
            </TextItem>
            <TextItem>
                Є одним із алгоритмів із можливістю генерувати ідеальний лабіринт без збереження будь-якого стану взагалі.
                Це дозволяє будувати лабіринти абсолютно будь-яких розмірів.
            </TextItem>
        </>
    );
}

export default BinaryTreeAlgorithmInfo;