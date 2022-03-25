import BaseSorting from './BaseSorting';
import {types} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../../defaults';

class TreeSort extends BaseSorting {
    constructor(tree, array, waitTimeout, handleStop, drawFunction) {
        super(tree, array, waitTimeout, handleStop, drawFunction);
    }
    async algorithmlInner() {
        for(let i = 0; i < this.array.length; ++i){
            this.array[i].type = types.checking;
            this.drawFunction(this.tree, this.array);
            let node = await this.insert(this.tree, this.array[i].value);
            this.array[i].type = types.added;
            node.type = types.added;
            this.drawFunction(this.tree, this.array);
            await Defaults.delay(this.waitTimeout);
            node.type = types.regular;
        }
        this.array.length = 0;
        this.drawFunction(this.tree, this.array);
        await Defaults.delay(this.waitTimeout);
        this.LNR(this.tree);
    }

    async insert(node, valueToAdd) {
        // first node will be empty
        if(node.value == null) {
            node.value = valueToAdd;
            node.type = types.regular;
            return node;
        }

        node.type = types.checking;
        this.drawFunction(this.tree, this.array);
        await Defaults.delay(this.waitTimeout);
        node.type = types.regular;

        if(node.value > valueToAdd) {
            if(node.left == null) {
                node.setLeftChild({value: valueToAdd, parent: node});
                return node.left;
            }
            else {
                return await this.insert(node.left, valueToAdd);
            }
        }
        else {
            if(node.right == null) {
                node.setRightChild({value: valueToAdd, parent: node});
                return node.right;
            }
            else {
                return await this.insert(node.right, valueToAdd);
            }
        }
    }

    async LNR(node) {
        if(this.stopFlag) {
            throw Defaults.stopError;
        }

        if(node.left) {
            await this.LNR(node.left)
        }

        node.type = types.done;
        this.array.push({value: node.value, type: types.done});
        this.drawFunction(this.tree, this.array);

        await Defaults.delay(this.waitTimeout);

        if(node.right) {
            await this.LNR(node.right)
        }
    }
}

export default TreeSort