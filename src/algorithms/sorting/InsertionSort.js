import Defaults from '../../defaults';

class InsertionSort {
    constructor(){
        this.stop = false;
    }

    async  sort(array, updateArray, finishSorting, waitTimeout){
        let length = array.length;
        let newArray = [];
        for (let i = 1; i < length; i++) {
            let key = i;
            for(let j = i - 1; j >= 0; j--){
                array[j].color = Defaults.sortingCheckingColor;
                array[key].color = Defaults.sortingCheckingColor;
                newArray = [...array];
                updateArray(newArray);
                if(this.stop === true){
                    return;
                }
                await Defaults.delay(waitTimeout);
                array[j].color = Defaults.sortingDefaultColor;
                array[key].color = Defaults.sortingDefaultColor;
                if(array[j].value > array[key].value ){
                    let tmp = array[j].value;
                    array[j].value = array[key].value;
                    array[key].value = tmp;
                    array[j].color = Defaults.sortingSwappingColor;
                    array[key].color = Defaults.sortingSwappingColor;
                    newArray = [...array];
                    updateArray(newArray);
                    if(this.stop === true){
                        return;
                    }
                    await Defaults.delay(waitTimeout);
                    array[j].color = Defaults.sortingDefaultColor;
                    array[key].color = Defaults.sortingDefaultColor;

                    key = j;
                }
                else{
                    break;
                }
            }
        }
        finishSorting();
    }

    stopSorting(){
        this.stop = true;
    }
}

export default InsertionSort;