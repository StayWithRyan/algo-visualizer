import BaseStringSearching from './BaseStringSearching';

class KMPAlgorithm extends BaseStringSearching {
    innerSearch() {
        let M = this.pattern.length;
        let N = this.text.length;

        let lps = this.computeLPSArray();
        this.setPatternLocation(0);
        this.setPatternPreprocessing();

        let j = 0;

        let i = 0;

        while (i < N) {
            if(N - i < M -j) {
                break;
            }

            if (this.pattern[j].char === this.text[i].char) {
                this.setPatternLocation(i - j);
                this.setChecking(i, j);
                j++;
                i++;

                if(j === M) {
                    this.found = true;
                    this.setTextMatch(i - M, i);
                    break;
                }
            }
            if(i < N) {

                if(this.pattern[j].char !== this.text[i].char) {
                    this.setPatternLocation(i - j);
                    this.setChecking(i, j);
    
                    if (j != 0) {
                        j = lps[j - 1];
                    }
                    else {
                        i = i + 1;
                    }
                }
            }
        }
    }

    computeLPSArray() {
        let M = this.pattern.length;
        let len = 0;
        let lps = new Array(M);
        let i = 1;
        lps[0] = 0;
        
        
        while (i < M) {
            if(this.pattern[i].char === this.pattern[len].char) {
                len += 1;
                lps[i] = len;
                i += 1;
            }
            else
            {
                if (len != 0) {
                    len = lps[len - 1];
  
                }
                else // if (len == 0)
                {
                    lps[i] = len;
                    i++;
                }
            }

        }
        return lps;
    }

}

export default KMPAlgorithm;