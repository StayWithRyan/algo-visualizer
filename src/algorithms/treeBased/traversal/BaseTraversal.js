import Constants from '../../../constants';
import {VisitedNodeType} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {VisitedElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import {array, tree} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';

class BaseTraversal {
    constructor(handleStop, waitTimeout) {
        this.stopFlag = false;
        this.handleStop = handleStop;
        this.waitTimeout = waitTimeout;
    }

    async algorithm() {
        try{
            await this.traversal(tree);
            this.handleStop();
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

    stop() {
        this.stopFlag = true;
    }

    async setVisiting(node) {
        await Constants.delay(this.waitTimeout);
        if(this.stopFlag) {
            throw Constants.stopError;
        }
        node.setType(VisitedNodeType);
        array.push(new ArrayElement(node.value, VisitedElementType));
    }

}

export default BaseTraversal