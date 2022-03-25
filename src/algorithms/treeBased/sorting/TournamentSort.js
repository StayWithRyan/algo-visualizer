import BaseSorting from './BaseSorting';
import {types, createTournamentSortTree, getNodesFromLevel, getTreeMaxLevel} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../../defaults';

class TournamentSort extends BaseSorting {
    constructor(tree, array, waitTimeout, handleStop, drawFunction) {
        super(tree, array, waitTimeout, handleStop, drawFunction);
    }
    async algorithmlInner() {
        let lastLevel = getTreeMaxLevel(this.tree);
        let nodes = getNodesFromLevel(this.tree, lastLevel);
        let arraySize = nodes.length;
        for(let i = 0; i < arraySize - 1; ++i) {
            await this.buildTournament();
            this.array.push({value: this.tree.value, type: types.done});

            lastLevel = getTreeMaxLevel(this.tree);
            nodes = getNodesFromLevel(this.tree, lastLevel);
            let array = [];
            for(let i = 0; i < nodes.length; ++i){
                if(nodes[i].value != this.tree.value) {
                    array.push({value: nodes[i].value});
                }
            }
            this.tree.left = null;
            this.tree.right = null;
            this.tree.type = types.invisible;
            this.tree.value = null;

            createTournamentSortTree({treeRoot: this.tree, arrayParam: array});

            this.drawFunction(this.tree, this.array, true);
            await Defaults.delay(this.waitTimeout);
        }
        this.tree.type = types.added;
        this.drawFunction(this.tree, this.array, true);
        await Defaults.delay(this.waitTimeout);

        this.array.push({value: this.tree.value, type: types.done});
        this.tree.type = types.invisible;
        this.drawFunction(this.tree, this.array, true);


    }
    async buildTournament() {
        let lastLevel = getTreeMaxLevel(this.tree);
        while(lastLevel > 1) {
            let nodes = getNodesFromLevel(this.tree, lastLevel);
            for(let i = 0; i < nodes.length; i += 2) {
                let maxNode = nodes[i];

                nodes[i].type = types.checking;
                this.drawFunction(this.tree, this.array);
                await Defaults.delay(this.waitTimeout);

                if(i + 1 < nodes.length) {
                    if(nodes[i + 1].value < maxNode.value) {
                        maxNode = nodes[i + 1];
                    }
                    nodes[i + 1].type = types.checking;
                    this.drawFunction(this.tree, this.array);
                    await Defaults.delay(this.waitTimeout);
                }
                maxNode.parent.type = types.added;
                maxNode.parent.value = maxNode.value;
                this.drawFunction(this.tree, this.array);
                await Defaults.delay(this.waitTimeout);
                maxNode.parent.type = types.regular;
            }
            lastLevel--;
        }
    }
}

export default TournamentSort