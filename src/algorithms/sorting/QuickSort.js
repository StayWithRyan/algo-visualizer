import BaseSort from './BaseSort';

class QuickSort extends BaseSort {
    innerSort() {
        this.quickSort(0, this.array.length - 1);
    }

    partition(low, high) {
        let pivot = this.array[high].value;
        let i = (low - 1);
     
        for (let j = low; j <= high - 1; j++) {
            this.setChecking(j, high);
            if (this.array[j].value < pivot) {
                i++;
                if(i !== j) {
                    this.swap(i, j);
                    this.setSwapping(i, j);
                }
            }
        }
        if(i + 1 !== high) {
            this.swap(i + 1, high);
            this.setSwapping(i + 1, high);
        }

        return (i + 1);
    }
     
    quickSort(low, high) {
        if (low < high) {
            let pi = this.partition(low, high);
            this.quickSort(low, pi - 1);
            this.quickSort(pi + 1, high);
        }
    }
}

export default QuickSort;