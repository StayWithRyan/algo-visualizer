import BaseSort from './BaseSort';

class HeapSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout) {
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async innerSort()
    {
        let n = this.array.length;

        // Build heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i);
        }
 
        // One by one extract an element from heap
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            this.swap(0, i);
            await this.setSwapping(0, i);

            // call max heapify on the reduced heap
            await this.heapify(i, 0);

        }
        this.finishSorting();
    }
 
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    async heapify(n, i)
    {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        
        if(l < n) {
            await this.setChecking(largest, l);
            if (this.array[l].value > this.array[largest].value) {
                largest = l;
            }
        }

        if(r < n) {
            await this.setChecking(largest, r);
            if (this.array[r].value > this.array[largest].value) {
                largest = r;
            }
        }
       

        if (largest != i) {
            this.swap(i, largest);
            await this.setSwapping(largest, i);
 
            // Recursively heapify the affected sub-tree
            await this.heapify(n, largest);
        }
    }
}

export default HeapSort;