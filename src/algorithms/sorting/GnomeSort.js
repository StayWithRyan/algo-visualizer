import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class GnomeSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort()
    {
        let length = array.length;
        let index = 0;
   
        while (index < length) {
            if (index == 0) {
                index++;
            }
            await this.setChecking(index, index - 1);
            if (array[index].value >= array[index - 1].value) {
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