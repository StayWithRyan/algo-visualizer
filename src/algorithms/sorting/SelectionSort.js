import BaseSort from './BaseSort';

class SelectionSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async sort(){
        let length = this.array.length;
        let i, j, max_idx;
        for (i = length - 1; i >= 0; i--) {
            max_idx = i;
            for (j = 0; j < i; j++) {
                await this.setChecking(j, max_idx);
                if (this.array[j].value > this.array[max_idx].value) {
                    max_idx = j;
                }
            }
            this.swap(i, max_idx);
            await this.setSwapping(i, max_idx);
        }
        this.finishSorting();
    }

}


export default SelectionSort;
