import Defaults from '../../defaults';

class BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        this.stop = false;
        this.array = [...array];
        this.updateArray = updateArray;
        this.finishSorting = finishSorting;
        this.waitTimeout = waitTimeout;
    }

    swap(i, j) {
        let temp = this.array[i].value;
        this.array[i].value = this.array[j].value;
        this.array[j].value = temp;
    }
     

    stopSorting(){
        this.stop = true;
    }

    async visualizeSingleChecking(i){        
        if(this.stop === true){
            throw "Preventing sorting from executing";
        }
        this.array[i].color = Defaults.sortingCheckingColor;
        let newArray = [...this.array];
        this.updateArray(newArray);
        await Defaults.delay(this.waitTimeout);
        this.array[i].color = Defaults.sortingDefaultColor;
    }

    async visualizeChecking(i, j) {
        if(this.stop === true){
            throw "Preventing sorting from executing";
        }
        this.array[i].color = Defaults.sortingCheckingColor;
        this.array[j].color = Defaults.sortingCheckingColor;
        let newArray = [...this.array];
        this.updateArray(newArray);
        await Defaults.delay(this.waitTimeout);
        this.array[i].color = Defaults.sortingDefaultColor;
        this.array[j].color = Defaults.sortingDefaultColor;
    }

    async visualizeSingleSwapping(i){
        if(this.stop === true){
            throw "Preventing sorting from executing";
        }
        this.array[i].color = Defaults.sortingSwappingColor;
        let newArray = [...this.array];
        this.updateArray(newArray);
        await Defaults.delay(this.waitTimeout);
        this.array[i].color = Defaults.sortingDefaultColor;
    }
    async visualizeSwapping(i, j){
        if(this.stop === true){
            throw "Preventing sorting from executing";
        }
        this.array[i].color = Defaults.sortingSwappingColor;
        this.array[j].color = Defaults.sortingSwappingColor;
        let newArray = [...this.array];
        this.updateArray(newArray);
        await Defaults.delay(this.waitTimeout);
        this.array[i].color = Defaults.sortingDefaultColor;
        this.array[j].color = Defaults.sortingDefaultColor;
    }
}

export default BaseSort