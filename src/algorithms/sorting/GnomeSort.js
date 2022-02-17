import BaseSort from './BaseSort';

class GnomeSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async innerSort()
    {
        let length = this.array.length;
        let index = 0;
   
        while (index < length) {
            if (index == 0) {
                index++;
            }
            await this.setChecking(index, index - 1);
            if (this.array[index].value >= this.array[index - 1].value) {
                index++;
            }
            else {
                this.swap(index, index - 1);
                await this.setSwapping(index, index - 1);
                index--;
            }
        }
        this.finishSorting();
    }

}

export default GnomeSort;