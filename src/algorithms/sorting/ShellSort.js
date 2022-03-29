import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class ShellSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort() {
        let length = array.length;
  
        for (let gap = Math.floor(length/2); gap > 0; gap = Math.floor(gap/2))
        {
            for (let i = gap; i < length; i++) {

                for(let j = i; j >= gap; j-=gap) {
                    await this.setChecking(j - gap, j);
                    if(array[j - gap].value > array[j].value) {
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