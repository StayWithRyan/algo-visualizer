import BaseSort from './BaseSort';

class BubbleSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async innerSort(){
        let length = this.array.length;
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                await this.setChecking(j, j + 1);
                if (this.array[j].value > this.array[j + 1].value) {
                    this.swap(j, j + 1);
                    await this.setSwapping(j, j + 1);
                }
            }
        }
        this.finishSorting();
    }

}

export default BubbleSort;