import BaseSort from './BaseSort';

class QuickSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async innerSort(){
        await this.quickSort(0, this.array.length - 1);
        this.finishSorting();
    }

    async partition(low, high) {
        let pivot = this.array[high].value;
        let i = (low - 1);
     
        for (let j = low; j <= high - 1; j++) {
            await this.setChecking(j, high);
            if (this.array[j].value < pivot) {
                i++;
                if(i !== j) {
                    this.swap(i, j);
                    await this.setSwapping(i, j);
                }
            }
        }
        if(i + 1 !== high){
            this.swap(i + 1, high);
            await this.setSwapping(i + 1, high);
        }

        return (i + 1);
    }
     
    async quickSort(low, high) {
        if (low < high) {
            let pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }
}

export default QuickSort;