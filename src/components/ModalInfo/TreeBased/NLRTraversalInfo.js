import TextItem from "../TextItem"
import HorizontalLine from "../HorizontalLine"

function NLRTraversalInfo() {
    return (
        <>
            <TextItem>
                Обхід бінарного дерева або пошук по дереву є одним з видів обходу графу, 
                який передбачає відвідування (перевірку або модифікацію) кожної вершини дерева рівно один раз.
            </TextItem>
            <TextItem>
                NLR - Node, Left, Right. Це підказка у назві алгоритму, яка вказує на порядок проходження дерева
            </TextItem>

            <HorizontalLine/>
            
            <TextItem>Покроковий опис низхідного обходу (На першому кроці поточна вершина встановлюється як корінь дерева):</TextItem>
            <TextItem tabs={1}>{"1. Відвідати поточну вершину"}</TextItem>
            <TextItem tabs={1}>{"2. Якщо у поточної вершини є лівий син, рекурсивно викликати даний алгоритм для цієї вершини"}</TextItem>
            <TextItem tabs={1}>{"3. Якщо у поточної вершини є правий син, рекурсивно викликати даний алгоритм для цієї вершини"}</TextItem>
        </>
    );
}

export default NLRTraversalInfo;