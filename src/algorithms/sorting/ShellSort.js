import BaseSort from './BaseSort';

class ShellSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout) {
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async innerSort() {
        let length = this.array.length;
  
        for (let gap = Math.floor(length/2); gap > 0; gap = Math.floor(gap/2))
        {
            for (let i = gap; i < length; i++) {

                for(let j = i; j >= gap; j-=gap) {
                    await this.setChecking(j - gap, j);
                    if(this.array[j - gap].value > this.array[j].value) {
                        this.swap(j - gap, j);
                        await this.setSwapping(j - gap, j);
                    }
                    else{
                        break;
                    }
                }
            }
        }
        
        this.finishSorting();
    }

}

export default ShellSort;