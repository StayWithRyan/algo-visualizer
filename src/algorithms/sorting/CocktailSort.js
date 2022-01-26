import BaseSort from './BaseSort';

class CocktailSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async sort()
    {
        let swapped = true;
        let start = 0;
        let end = this.array.length;
  
        while (swapped == true) {
            swapped = false;

            for (let i = start; i < end - 1; ++i) {
                await this.visualizeChecking(i, i + 1);
                if (this.array[i].value > this.array[i + 1].value) {
                    this.swap(i, i + 1);
                    await this.visualizeSwapping(i, i + 1);
                    swapped = true;
                }
            }
            if (swapped == false) {
                break;
            }
            swapped = false;
            end = end - 1;
  
            for (let i = end - 1; i >= start; i--) {
                await this.visualizeChecking(i, i + 1);
                if (this.array[i].value > this.array[i + 1].value) {
                    this.swap(i, i + 1);
                    await this.visualizeSwapping(i, i + 1);
                    swapped = true;
                }
            }
            start = start + 1;
        }
        this.finishSorting();
    }

}

export default CocktailSort;