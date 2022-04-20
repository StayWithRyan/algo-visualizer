import BaseSort from './BaseSort';

class CocktailSort extends BaseSort {
    innerSort() {
        let swapped = true;
        let start = 0;
        let end = this.array.length - 1;
  
        while (swapped == true) {
            swapped = false;

            for (let i = start; i <= end - 1; ++i) {
                this.setChecking(i, i + 1);
                if (this.array[i].value > this.array[i + 1].value) {
                    this.swap(i, i + 1);
                    this.setSwapping(i, i + 1);
                    swapped = true;
                }
            }
            if (swapped == false) {
                break;
            }
            swapped = false;
            end = end - 1;
  
            for (let i = end - 1; i >= start; i--) {
                this.setChecking(i, i + 1);
                if (this.array[i].value > this.array[i + 1].value) {
                    this.swap(i, i + 1);
                    this.setSwapping(i, i + 1);
                    swapped = true;
                }
            }
            start = start + 1;
        }
    }

}

export default CocktailSort;