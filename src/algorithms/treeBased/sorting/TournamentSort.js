import BaseSorting from './BaseSorting';
import {createTournamentSortTree, getNodesFromLevel, getTreeMaxLevel, addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Constants from '../../../constants';
import {
    AddedNodeType, CheckingNodeType, 
    InvisibleNodeType, RegularNodeType
} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {DoneElement, DoneElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';

class TournamentSort extends BaseSorting {
    algorithmlInner() {
        let lastLevel = getTreeMaxLevel(this.tree);
        let nodes = getNodesFromLevel(this.tree, lastLevel);
        let arraySize = nodes.length;
        for(let i = 0; i < arraySize - 1; ++i) {
            this.buildTournament();
            this.array.push(new ArrayElement(this.tree.value, DoneElementType));
            lastLevel = getTreeMaxLevel(this.tree);
            nodes = getNodesFromLevel(this.tree, lastLevel);
            let nextlastLevelNodex = [];
            for(let i = 0; i < nodes.length; ++i){
                if(nodes[i].value != this.tree.value) {
                    nextlastLevelNodex.push(new ArrayElement(nodes[i].value));
                }
            }
            this.tree = createTournamentSortTree({arrayParam: nextlastLevelNodex});
            addStep(this.tree, this.array);
        }

        this.tree.setType(AddedNodeType);
        addStep(this.tree, this.array);
        this.array.push(new ArrayElement(this.tree.value, DoneElementType));
        this.tree = null;
        addStep(this.tree, this.array);
    }

    buildTournament() {
        let lastLevel = getTreeMaxLevel(this.tree);
        while(lastLevel > 1) {
            let nodes = getNodesFromLevel(this.tree, lastLevel);
            for(let i = 0; i < nodes.length; i += 2) {
                let minNode = nodes[i];

                nodes[i].setType(CheckingNodeType);
                addStep(this.tree, this.array);

                if(i + 1 < nodes.length) {
                    if(nodes[i + 1].value < minNode.value) {
                        minNode = nodes[i + 1];
                    }
                    nodes[i + 1].setType(CheckingNodeType);
                    addStep(this.tree, this.array);
                }
                minNode.parent.setType(AddedNodeType);
                minNode.parent.value = minNode.value;
                addStep(this.tree, this.array);
                minNode.parent.setType(RegularNodeType);
            }
            lastLevel--;
        }
    }
}

export default TournamentSort