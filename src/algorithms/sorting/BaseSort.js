import {CheckingElementType, RegularElementType, SwappingElementType} from "../../screens/SortingPage/Elements/ArrayElementTypes";
import {addStep} from "../../screens/SortingPage/sortingHelpers";

class BaseSort {
    constructor(array) {
        this.array = array;
    }

    sort() {
        addStep(this.array);
        this.innerSort();
        addStep(this.array);
    }

    swap(i, j) {
        let temp = this.array[i].value;
        this.array[i].value = this.array[j].value;
        this.array[j].value = temp;
    }
     
    setSingleChecking(i) {        
        this.array[i].setType(CheckingElementType);
        addStep(this.array);
        this.array[i].setType(RegularElementType);
    }

    setChecking(i, j) {
        this.array[i].setType(CheckingElementType);
        this.array[j].setType(CheckingElementType);
        addStep(this.array);
        this.array[i].setType(RegularElementType);
        this.array[j].setType(RegularElementType);
    }

    setSingleSwapping(i) {
        this.array[i].setType(SwappingElementType);
        addStep(this.array);
        this.array[i].setType(RegularElementType);
    }
    setSwapping(i, j) {
        this.array[i].setType(SwappingElementType);
        this.array[j].setType(SwappingElementType);
        addStep(this.array);
        this.array[i].setType(RegularElementType);
        this.array[j].setType(RegularElementType);
    }
}

export default BaseSort;