import Defaults from '../../defaults';

class SelectionSort {
    constructor(){
        this.stop = false;
    }

    async  sort(array, updateArray, finishSorting, waitTimeout){
        let length = array.length;
        let i, j, min_idx;
        let newArray = [];
        for (i = 0; i < length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < length; j++) {

                array[j].color = Defaults.sortingCheckingColor;
                array[min_idx].color = Defaults.sortingCheckingColor;
                newArray = [...array];
                if(this.stop === true){
                    return;
                }
                updateArray(newArray);
                await Defaults.delay(waitTimeout);
                array[j].color = Defaults.sortingDefaultColor;
                array[min_idx].color = Defaults.sortingDefaultColor;
                if (array[j].value < array[min_idx].value)
                    min_idx = j;
            }
            let tmp = array[min_idx].value;
            array[min_idx].value = array[i].value;
            array[i].value = tmp;

            array[min_idx].color = Defaults.sortingSwappingColor;
            array[i].color = Defaults.sortingSwappingColor;
            newArray = [...array];
            if(this.stop === true){
                return;
            }
            updateArray(newArray);
            await Defaults.delay(waitTimeout);
            array[min_idx].color = Defaults.sortingDefaultColor;
            array[i].color = Defaults.sortingDefaultColor;



        }
        finishSorting();
    }

    stopSorting(){
        this.stop = true;
    }
}


export default SelectionSort;
