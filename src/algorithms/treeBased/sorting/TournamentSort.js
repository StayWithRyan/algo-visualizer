import BaseSorting from './BaseSorting';
import {createTournamentSortTree, getNodesFromLevel, getTreeMaxLevel} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Constants from '../../../constants';
import {
    AddedNodeType, CheckingNodeType, 
    InvisibleNodeType, RegularNodeType
} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {DoneElement, DoneElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';
import {tree, setNewTree, array} from '../../../screens/TreeBasedPage/treeBasedHelpers';

class TournamentSort extends BaseSorting {
    constructor(handleStop, waitTimeout) {
        super(handleStop, waitTimeout);
    }

    async algorithmlInner() {
        let lastLevel = getTreeMaxLevel(tree);
        let nodes = getNodesFromLevel(lastLevel);
        let arraySize = nodes.length;
        for(let i = 0; i < arraySize - 1; ++i) {
            await this.buildTournament();
            array.push(new ArrayElement(tree.value, DoneElementType));
            lastLevel = getTreeMaxLevel(tree);
            nodes = getNodesFromLevel(lastLevel);
            let nextlastLevelNodex = [];
            for(let i = 0; i < nodes.length; ++i){
                if(nodes[i].value != tree.value) {
                    nextlastLevelNodex.push(new ArrayElement(nodes[i].value));
                }
            }
            createTournamentSortTree({arrayParam: nextlastLevelNodex});
            await Constants.delay(this.waitTimeout);
        }

        tree.setType(AddedNodeType)
        await Constants.delay(this.waitTimeout);
        array.push(new ArrayElement(tree.value, DoneElementType));
        setNewTree(null);
    }

    async buildTournament() {
        let lastLevel = getTreeMaxLevel(tree);
        while(lastLevel > 1) {
            let nodes = getNodesFromLevel(lastLevel);
            for(let i = 0; i < nodes.length; i += 2) {
                let minNode = nodes[i];

                nodes[i].setType(CheckingNodeType);
                await Constants.delay(this.waitTimeout);

                if(i + 1 < nodes.length) {
                    if(nodes[i + 1].value < minNode.value) {
                        minNode = nodes[i + 1];
                    }
                    nodes[i + 1].setType(CheckingNodeType);
                    await Constants.delay(this.waitTimeout);
                }
                minNode.parent.setType(AddedNodeType);
                minNode.parent.value = minNode.value;
                await Constants.delay(this.waitTimeout);
                minNode.parent.setType(RegularNodeType);
            }
            lastLevel--;
        }
    }
}

export default TournamentSort