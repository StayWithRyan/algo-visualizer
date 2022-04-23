import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function LRNTraversalInfo() {
    return (
        <>
            <TextItem>
                Обхід бінарного дерева, або пошук по дереву є одним із видів обходу графу, 
                який передбачає відвідування (перевірку або модифікацію) кожної вершини дерева рівно один раз.
            </TextItem>
            <TextItem>
                LRN - Left, Right, Node. Це підказка в назві алгоритму, яка вказує на порядок проходження дерева
            </TextItem>

            <HorizontalLine/>
            
            <TextItem>Покроковий опис висхідного обходу (На першому кроці поточна вершина - корінь дерева):</TextItem>
            <TextItem tabs={1}>{"1. Якщо в поточної вершини є лівий син, рекурсивно виконати цей алгоритм для цієї вершини"}</TextItem>
            <TextItem tabs={1}>{"2. Якщо в поточної вершини є правий син, рекурсивно виконати цей алгоритм для цієї вершини"}</TextItem>
            <TextItem tabs={1}>{"3. Відвідати поточну вершину"}</TextItem>
        </>
    );
}

export default LRNTraversalInfo;