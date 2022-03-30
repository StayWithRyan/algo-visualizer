import BaseSort from './BaseSort';

class SelectionSort extends BaseSort {
    constructor(array) {
        super(array);
    }

    innerSort() {
        let length = this.array.length;
        let i, j, max_idx;
        for (i = length - 1; i >= 0; i--) {
            max_idx = i;
            for (j = 0; j < i; j++) {
                this.setChecking(j, max_idx);
                if (this.array[j].value > this.array[max_idx].value) {
                    max_idx = j;
                }
            }
            this.swap(i, max_idx);
            this.setSwapping(i, max_idx);
        }
    }

}


export default SelectionSort;
