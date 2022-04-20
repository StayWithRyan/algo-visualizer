import BaseSort from './BaseSort';

class InsertionSort extends BaseSort {
    innerSort() {
        for (let i = 1; i <= this.array.length - 1; i++) {
            let key = i;
            for(let j = i - 1; j >= 0; j--) {
                this.setChecking(j, key);
                if(this.array[j].value > this.array[key].value ) {
                    this.swap(j, key);
                    this.setSwapping(j, key);
                    key = j;
                }
                else{
                    break;
                }
            }
        }
    }

}

export default InsertionSort;