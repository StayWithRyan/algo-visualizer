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
        let badchar = new Array(Defaults.NO_OF_CHARS);
        for (let i = 0; i < Defaults.NO_OF_CHARS; i++) {
            badchar[i] = -1;
        }
        for (let i = 0; i < this.pattern.length; i++) {
            badchar[this.pattern[i].character.charCodeAt(0)] = i;
        }
        return badchar;
    }
     
    async innerSearch() {

        let m = this.pattern.length;
        let n = this.text.length;
    
        let badchar = this.badCharHeuristic();
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
            s += this.max(1, j - badchar[this.text[s + j].character.charCodeAt(0)]);
        }
    }
}

export default BoyerMooreAlgorithm;