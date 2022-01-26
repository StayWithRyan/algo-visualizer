import BaseSort from './BaseSort';

class BubbleSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async sort(){
        let length = this.array.length;
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                await this.visualizeChecking(j, j + 1);
                if (this.array[j].value > this.array[j + 1].value) {
                    this.swap(j, j + 1);
                    await this.visualizeSwapping(j, j + 1);
                }
            }
        }
        this.finishSorting();
    }

}

export default BubbleSort;