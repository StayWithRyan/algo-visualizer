import BaseStringSearching from './BaseStringSearching';

class OptimizedNaiveAlgorithm extends BaseStringSearching {
    innerSearch() {
        let M = this.pattern.length;
        let N = this.text.length;
        let i = 0;
        
        while(i <= N - M) {
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
            else if (j == 0) {
                i = i + 1;
            }
            else {
                i = i + j;
            }
            
        }
    }

}

export default OptimizedNaiveAlgorithm;