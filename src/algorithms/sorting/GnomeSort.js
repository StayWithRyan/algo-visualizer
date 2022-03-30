import BaseSort from './BaseSort';

class GnomeSort extends BaseSort {
    innerSort() {
        let length = this.array.length;
        let index = 0;
   
        while (index < length) {
            if (index == 0) {
                index++;
            }
            this.setChecking(index, index - 1);
            if (this.array[index].value >= this.array[index - 1].value) {
                index++;
            }
            else {
                this.swap(index, index - 1);
                this.setSwapping(index, index - 1);
                index--;
            }
        }
    }

}

export default GnomeSort;