import { breakpoints } from '@mui/system';
import Defaults from '../../defaults';

import BaseStringSearching from './BaseStringSearching';



class BoyerMooreAlgorithm extends BaseStringSearching {
    constructor(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray){
        super(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray);
    }

    max(a,b) {
        return (a > b)? a: b;
    }
     

    badCharHeuristic() {
        this.badchar = {};
        for (let i = 0; i < this.pattern.length; i++) {
            this.badchar[this.pattern[i].character] = -1;
        }
        for (let i = 0; i < this.pattern.length; i++) {
            this.badchar[this.pattern[i].character] = i;
        }
    }
     

    getBadCharHeuristicValue(value) {
        if(this.badchar.hasOwnProperty(value)){
            return this.badchar[value];
        }
        else{
            return -1;
        }
    }
     
    async innerSearch() {

        let m = this.pattern.length;
        let n = this.text.length;
    
        this.badCharHeuristic();
        await this.setPatternPreprocessing();
        this.setDefaultColor();
    
        let s = 0;
        
        while(s <= (n - m)) {
            await this.setPatternLocation(s);
            let j = m - 1;
    

            while(j >= 0) {
                await this.setChecking(j + s, j);
                this.setDefaultColor();
                if(this.pattern[j].character == this.text[s + j].character) {
                    j--;
                }
                else {
                    break;
                }
            }

            if (j < 0) {
                this.found = true;
                await this.setTextMatch(s, s + m);
                break;
            }
            s += this.max(1, j - this.getBadCharHeuristicValue(this.text[s + j].character));
        }
    }
}

export default BoyerMooreAlgorithm;