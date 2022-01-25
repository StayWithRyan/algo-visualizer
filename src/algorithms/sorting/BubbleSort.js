import Defaults from '../../defaults';

class BubbleSort {
    constructor(){
        this.stop = false;
    }

    async  sort(array, updateArray, finishSorting, waitTimeout){
        let length = array.length;
        let newArray = []
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                array[j].color = Defaults.sortingCheckingColor;
                array[j + 1].color = Defaults.sortingCheckingColor;
                newArray = [...array];
                updateArray(newArray);
                if(this.stop === true){
                    return;
                }
                await Defaults.delay(waitTimeout);
                array[j].color = Defaults.sortingDefaultColor;
                array[j + 1].color = Defaults.sortingDefaultColor;
                if (array[j].value > array[j + 1].value) {
                    
                    let tmp = array[j].value;
                    array[j].value = array[j + 1].value;
                    array[j + 1].value = tmp;
                    array[j].color = Defaults.sortingSwappingColor;
                    array[j + 1].color = Defaults.sortingSwappingColor;
                    const newArray = [...array];
                    if(this.stop === true){
                        return;
                    }
                    updateArray(newArray);
                    await Defaults.delay(waitTimeout);
                    array[j].color = Defaults.sortingDefaultColor;
                    array[j + 1].color = Defaults.sortingDefaultColor;
                }
            }
        }
        finishSorting();
    }

    stopSorting(){
        this.stop = true;
    }
}

export default BubbleSort;