import BaseSort from './BaseSort';
import {array} from "../../screens/SortingPage/sortingHelpers";

class MergeSort extends BaseSort {
    constructor(finishSorting, waitTimeout) {
        super(finishSorting, waitTimeout);
    }

    async innerSort() {
        await this.mergeSort(0, array.length - 1);
        this.finishSorting();
    }

    async mergeSort(l, r) {
        if(l>=r) {
            return;
        }
        let m =l+ parseInt((r-l)/2);
        await this.mergeSort(l,m);
        await this.mergeSort(m+1,r);
        await this.merge(l,m,r);
    }

    async merge(l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
    
        let i = 0;
        let j = 0;
        let mergedArray = [];
    
        while (i < n1 && j < n2) {
            if (array[l + i].value <= array[m + 1 + j].value) {
                mergedArray.push(array[l + i].value);
                await this.setSingleChecking(l + i);
                i++;
            }
            else {
                mergedArray.push(array[m + 1 + j].value);
                await this.setSingleChecking(m + 1 + j);
                j++;
            }
        }

        while (i < n1) {
            mergedArray.push(array[l + i].value);
            await this.setSingleChecking(l + i);
            i++;
        }
    
        while (j < n2) {
            mergedArray.push(array[m + 1 + j].value);
            await this.setSingleChecking(m + 1 + j);
            j++;
        }

        for(let i = 0; i < mergedArray.length; i++) {
            array[l + i].value = mergedArray[i];
            await this.setSingleSwapping(l + i);
        }
    }
  
}

export default MergeSort;