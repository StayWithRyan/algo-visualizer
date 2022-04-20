import BaseSort from './BaseSort';

class SelectionSort extends BaseSort {
    innerSort() {
        for (let i = this.array.length - 1; i >= 1; i--) {
            let max_idx = 0;
            for (let j = 1; j <= i; j++) {
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
