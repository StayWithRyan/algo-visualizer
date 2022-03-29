import BaseStringSearching from './BaseStringSearching';

class KMPAlgorithm extends BaseStringSearching {
    constructor(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray) {
        super(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray);
    }

 
    async innerSearch() {
        let M = this.pattern.length;
        let N = this.text.length;

        let lps = this.computeLPSArray();
        await this.setPatternPreprocessing();
        this.setDefaultColor();

        let j = 0;

        let i = 0;

        while (i < N) {
            if(N - i < M -j) {
                break;
            }

            if (this.pattern[j].character === this.text[i].character) {
                await this.setPatternLocation(i - j);
                await this.setChecking(i, j);
                this.setDefaultColor();
                j++;
                i++;

                if(j === M) {
                    this.found = true;
                    await this.setTextMatch(i - M, i);
                    break;
                }
            }
            if(i < N) {

                if(this.pattern[j].character !== this.text[i].character) {
                    await this.setPatternLocation(i - j);
                    await this.setChecking(i, j);
                    this.setDefaultColor();
    
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
            if(this.pattern[i].character === this.pattern[len].character) {
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