import BaseSort from './BaseSort';

class MergeSort extends BaseSort {
    innerSort() {
        this.mergeSort(0, this.array.length - 1);
    }

    mergeSort(l, r) {
        if(l >= r) {
            return;
        }
        let m = l + parseInt((r - l) / 2);
        this.mergeSort(l, m);
        this.mergeSort(m+1, r);
        this.merge(l, m, r);
    }

    merge(l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
    
        let i = 0;
        let j = 0;
        let mergedArray = [];
    
        while (i < n1 && j < n2) {
            if (this.array[l + i].value <= this.array[m + 1 + j].value) {
                mergedArray.push(this.array[l + i].value);
                this.setSingleChecking(l + i);
                i++;
            }
            else {
                mergedArray.push(this.array[m + 1 + j].value);
                this.setSingleChecking(m + 1 + j);
                j++;
            }
        }

        while (i < n1) {
            mergedArray.push(this.array[l + i].value);
            this.setSingleChecking(l + i);
            i++;
        }
    
        while (j < n2) {
            mergedArray.push(this.array[m + 1 + j].value);
            this.setSingleChecking(m + 1 + j);
            j++;
        }

        for(let i = 0; i < mergedArray.length; i++) {
            this.array[l + i].value = mergedArray[i];
            this.setSingleSwapping(l + i);
        }
    }
  
}

export default MergeSort;