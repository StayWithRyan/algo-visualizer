import Constants from '../../constants';
import {CheckingElementType, RegularElementType, SwappingElementType} from "../../screens/SortingPage/Elements/ArrayElementTypes";
import {array} from "../../screens/SortingPage/sortingHelpers";

class BaseSort {
    constructor(finishSorting, waitTimeout) {
        this.stop = false;
        this.finishSorting = finishSorting;
        this.waitTimeout = waitTimeout;
    }

    async sort () {
        try{
            await this.innerSort();
        }
        catch(e) {
            if(e ==  Constants.stopError) {
                // This is ok. Used for stopping algorithm from executing
            }
            else{
                throw e;
            }
        }
    }
    swap(i, j) {
        let temp = array[i].value;
        array[i].value = array[j].value;
        array[j].value = temp;
    }
     
    stopSorting() {
        this.stop = true;
    }

    async setSingleChecking(i) {        
        if(this.stop === true) {
            throw Constants.stopError;
        }
        array[i].setType(CheckingElementType);
        await Constants.delay(this.waitTimeout);
        array[i].setType(RegularElementType);
    }

    async setChecking(i, j) {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        array[i].setType(CheckingElementType);
        array[j].setType(CheckingElementType);
        await Constants.delay(this.waitTimeout);
        array[i].setType(RegularElementType);
        array[j].setType(RegularElementType);
    }

    async setSingleSwapping(i) {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        array[i].setType(SwappingElementType);
        await Constants.delay(this.waitTimeout);
        array[i].setType(RegularElementType);
    }
    async setSwapping(i, j) {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        array[i].setType(SwappingElementType);
        array[j].setType(SwappingElementType);
        await Constants.delay(this.waitTimeout);
        array[i].setType(RegularElementType);
        array[j].setType(RegularElementType);
    }
}

export default BaseSort