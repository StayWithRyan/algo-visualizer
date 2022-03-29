import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class CocktailSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort()
    {
        let swapped = true;
        let start = 0;
        let end = array.length;
  
        while (swapped == true) {
            swapped = false;

            for (let i = start; i < end - 1; ++i) {
                await this.setChecking(i, i + 1);
                if (array[i].value > array[i + 1].value) {
                    this.swap(i, i + 1);
                    await this.setSwapping(i, i + 1);
                    swapped = true;
                }
            }
            if (swapped == false) {
                break;
            }
            swapped = false;
            end = end - 1;
  
            for (let i = end - 1; i >= start; i--) {
                await this.setChecking(i, i + 1);
                if (array[i].value > array[i + 1].value) {
                    this.swap(i, i + 1);
                    await this.setSwapping(i, i + 1);
                    swapped = true;
                }
            }
            start = start + 1;
        }
        this.finishSorting();
    }

}

export default CocktailSort;