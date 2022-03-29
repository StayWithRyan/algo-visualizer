import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class BubbleSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort() {
        let length = array.length;
        for (let i = 0; i < length - 1; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                await this.setChecking(j, j + 1);
                if (array[j].value > array[j + 1].value) {
                    this.swap(j, j + 1);
                    await this.setSwapping(j, j + 1);
                }
            }
        }
        this.finishSorting();
    }

}

export default BubbleSort;