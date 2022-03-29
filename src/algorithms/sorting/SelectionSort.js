import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class SelectionSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort() {
        let length = array.length;
        let i, j, max_idx;
        for (i = length - 1; i >= 0; i--) {
            max_idx = i;
            for (j = 0; j < i; j++) {
                await this.setChecking(j, max_idx);
                if (array[j].value > array[max_idx].value) {
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
