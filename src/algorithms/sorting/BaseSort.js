import Defaults from '../../defaults';

class BaseSort {
    constructor(array, updateArray, finishSorting, waitTimeout){
        this.stop = false;
        this.array = [...array];
        this.updateArray = updateArray;
        this.finishSorting = finishSorting;
        this.waitTimeout = waitTimeout;
    }

    async sort () {
        try{
            await this.innerSort();
        }
        catch(_){
            // This is ok. Used for stopping algorithm from executing
        }
    }
    swap(i, j) {
        let temp = this.array[i].value;
        this.array[i].value = this.array[j].value;
        this.array[j].value = temp;
    }
     

    stopSorting(){
        this.stop = true;
    }

    async setSingleChecking(i){        
        if(this.stop === true){
            throw "Preventing sorting from executing";
        }
        this.array[i].color = Defaults.sortingCheckingColor;
        let newArray = [...this.array];
        this.updateArray(newArray);
        await Defaults.delay(this.waitTimeout);
        this.array[i].color = Defaults.sortingDefaultColor;
    }

    async setChecking(i, j) {
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

    async setSingleSwapping(i){
        if(this.stop === true){
            throw "Preventing sorting from executing";
        }
        this.array[i].color = Defaults.sortingSwappingColor;
        let newArray = [...this.array];
        this.updateArray(newArray);
        await Defaults.delay(this.waitTimeout);
        this.array[i].color = Defaults.sortingDefaultColor;
    }
    async setSwapping(i, j){
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