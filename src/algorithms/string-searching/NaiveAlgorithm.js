import Defaults from '../../defaults';

import BaseStringSearching from './BaseStringSearching';

class NaiveAlgorithm extends BaseStringSearching {
    constructor(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray) {
        super(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray);
    }

 
    async innerSearch() {
        let M = this.pattern.length;
        let N = this.text.length;

        for (let i = 0; i <= N - M; i++) {
            await this.setPatternLocation(i);
            let j;
   
            /* For current index i, check for pattern
            match */
            for (j = 0; j < M; j++) {
                await this.setChecking(i + j, j);
                this.setDefaultColor();
                if (this.text[i + j].character != this.pattern[j].character) {
                    break;
                }
            }
   
            if (j == M) {
                this.found = true;
                await this.setTextMatch(i, i + j);
                break;
            }
            
        }
    }

}

export default NaiveAlgorithm;