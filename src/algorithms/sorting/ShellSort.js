import BaseSort from './BaseSort';

class ShellSort extends BaseSort {
    innerSort() {
        let length = this.array.length;
  
        for (let gap = Math.floor(length/2); gap > 0; gap = Math.floor(gap/2)) {
            for (let i = gap; i <= length - 1; i++) {
                for(let j = i; j >= gap; j-=gap) {
                    this.setChecking(j - gap, j);
                    if(this.array[j - gap].value > this.array[j].value) {
                        this.swap(j - gap, j);
                        this.setSwapping(j - gap, j);
                    }
                    else{
                        break;
                    }
                }
            }
        }
    }

}

export default ShellSort;