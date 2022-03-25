import {types} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../../defaults';

class BaseSorting {
    constructor(tree, array, waitTimeout, handleStop, drawFunction) {
        this.stopFlag = false;
        this.tree = tree;
        this.array = array;
        this.waitTimeout = waitTimeout;
        this.handleStop = handleStop;
        this.drawFunction = drawFunction;
    }

    async algorithm() {
        try{
            await this.algorithmlInner(this.tree);
            this.handleStop();
        }
        catch(e) {
            if(e ==  Defaults.stopError) {
                // This is ok. Used for stopping algorithm from executing
            }
            else{
                throw e;
            }
        }
    }

    stop() {
        this.stopFlag = true;
    }
}

export default BaseSorting