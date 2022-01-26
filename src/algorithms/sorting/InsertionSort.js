import BaseSort from './BaseSort';

class InsertionSort extends BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        super(array, updateArray, finishSorting, waitTimeout);
    }

    async sort(){
        let length = this.array.length;

        for (let i = 1; i < length; i++) {
            let key = i;
            for(let j = i - 1; j >= 0; j--){
                await this.visualizeChecking(j, key);
                if(this.array[j].value > this.array[key].value ){
                    this.swap(j, key);
                    await this.visualizeSwapping(j, key);
                    key = j;
                }
                else{
                    break;
                }
            }
        }
        this.finishSorting();
    }

}

export default InsertionSort;