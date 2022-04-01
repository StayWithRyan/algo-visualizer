import BaseStringSearching from './BaseStringSearching';

class NaiveAlgorithm extends BaseStringSearching {
    innerSearch() {
        let M = this.pattern.length;
        let N = this.text.length;

        for (let i = 0; i <= N - M; i++) {
            this.setPatternLocation(i);
            let j;
   
            /* For current index i, check for pattern
            match */
            for (j = 0; j < M; j++) {
                this.setChecking(i + j, j);
                if (this.text[i + j].char != this.pattern[j].char) {
                    break;
                }
            }
   
            if (j == M) {
                this.found = true;
                this.setTextMatch(i, i + j);
                break;
            }
            
        }
    }

}

export default NaiveAlgorithm;