import BaseSort from './BaseSort';

class BubbleSort extends BaseSort {
    innerSort() {
        let length = this.array.length;
        for (let i = 1; i <= length - 1; i++) {
            for (let j = 0; j <= length - i - 1; j++) {
                this.setChecking(j, j + 1);
                if (this.array[j].value > this.array[j + 1].value) {
                    this.swap(j, j + 1);
                    this.setSwapping(j, j + 1);
                }
            }
        }
    }

}

export default BubbleSort;
