import TextItem from "../TextItem"

function CocktailSortInfo() {
    return (
        <>
            <TextItem >
                Сортування змішуванням (англ. Cocktail sort) — один із різновидів алгоритму сортування бульбашкою. 
                Відрізняється від сортування бульбашкою тим, що сортування відбувається в обох напрямках, міняючи напрямок при кожному проході.
            </TextItem>
            <TextItem><div>Ефективність алгоритму - O(n<sup>2</sup>)</div></TextItem>
        </>
    );
}

export default CocktailSortInfo;