import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class InsertionSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort() {
        let length = array.length;

        for (let i = 1; i < length; i++) {
            let key = i;
            for(let j = i - 1; j >= 0; j--) {
                await this.setChecking(j, key);
                if(array[j].value > array[key].value ) {
                    this.swap(j, key);
                    await this.setSwapping(j, key);
                    key = j;
                }
                else{
                    break;
                }
            }
        }
        this.finishSorting();
    }

}

export default InsertionSort;