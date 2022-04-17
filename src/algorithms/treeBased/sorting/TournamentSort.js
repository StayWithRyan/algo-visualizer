import BaseSorting from './BaseSorting';
import {createTournamentSortTree, getNodesFromLevel, getTreeMaxLevel, addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';

import {
    CheckingNodeType,
    DoneNodeType, RegularNodeType
} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {
    DoneElementType
} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';

class TournamentSort extends BaseSorting {
    algorithmlInner() {
        let lastLevel = getTreeMaxLevel(this.tree);
        let nodes = getNodesFromLevel(this.tree, lastLevel);
        let arraySize = nodes.length;
        for(let i = 0; i < arraySize - 1; ++i) {
            this.buildTournament();
            this.array.push(new ArrayElement(this.tree.value, this.array.length, DoneElementType));
            this.setSingleDone(this.tree);
            lastLevel = getTreeMaxLevel(this.tree);
            nodes = getNodesFromLevel(this.tree, lastLevel);
            let nextlastLevelNodex = [];
            for(let i = 0; i < nodes.length; ++i){
                if(nodes[i].value != this.tree.value) {
                    nextlastLevelNodex.push(new ArrayElement(nodes[i].value, this.array.length));
                }
            }
            let prevTree = this.tree;
            this.tree = createTournamentSortTree({arrayParam: nextlastLevelNodex});
            addStep(this.tree, [], prevTree, false);
        }

        this.array.push(new ArrayElement(this.tree.value, this.array.length, DoneElementType));
        addStep(null, [this.array[this.array.length - 1]], this.tree, false);
    }

    buildTournament() {
        let lastLevel = getTreeMaxLevel(this.tree);
        while(lastLevel > 1) {
            let nodes = getNodesFromLevel(this.tree, lastLevel);
            for(let i = 0; i < nodes.length; i += 2) {
                let minNode = nodes[i];
                this.setSingleNodeChecking(nodes[i]);

                if(i + 1 < nodes.length) {
                    if(nodes[i + 1].value < minNode.value) {
                        minNode = nodes[i + 1];
                    }
                    this.setSingleNodeChecking(nodes[i + 1]);
                }
                minNode.parent.setValue(minNode.value);
                this.setSingleNodeJustAdded(minNode.parent);
            }
            lastLevel--;
        }
    }
    
    setSingleDone(node) {
        node.setType(DoneNodeType);
        addStep([node], [this.array[this.array.length - 1]]);
    }
    
    setSingleNodeChecking(node) {
        node.setType(CheckingNodeType);

        let treeStep = [node];

        if(this.prevNode && this.prevNode.id != node.id) {
            this.prevNode.setType(RegularNodeType, true);
            treeStep.push(this.prevNode);
        }
        
        addStep(treeStep, []);

        this.prevNode = node;
    }

    setSingleNodeJustAdded(node) {
        node.setType(RegularNodeType);

        let treeStep = [node];

        if(this.prevNode && this.prevNode.id != node.id) {
            this.prevNode.setType(RegularNodeType, true);
            treeStep.push(this.prevNode);
        }
        
        addStep(treeStep, []);

        node.prevValue = node.value;
        this.prevNode = null;
    }
}

export default TournamentSort