import Defaults from '../../defaults';

import BaseStringSearching from './BaseStringSearching';
let d = 256;
let q = 5;
class RabinKarpAlgorithm extends BaseStringSearching {
    constructor(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray){
        super(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray);
    }

    async innerSearch() {
        let M = this.pattern.length;
        let N = this.text.length;
        let i, j;
         
        // Hash value for pattern
        let p = 0;
         
        // Hash value for txt
        let t = 0;
        let h = 1;
     
        // The value of h would be "pow(d, M-1)%q"
        for(i = 0; i < M - 1; i++)
            h = (h * d) % q;
     
        // Calculate the hash value of pattern and
        // first window of text
        for(i = 0; i < M; i++) {
            p = (d * p + this.pattern[i].character.charCodeAt()) % q;
            t = (d * t + this.text[i].character.charCodeAt()) % q;
        }
     
        // Slide the pattern over text one by one
        for(i = 0; i <= N - M; i++) {
            await this.setPatternLocation(i);
            await this.setCheckingHash(i, i + M);
            this.setDefaultColor();
            // Check the hash values of current
            // window of text and pattern. If the
            // hash values match then only
            // check for characters on by one
            if (p == t) {
                 
                /* Check for characters one by one */
                for(j = 0; j < M; j++)
                {
                    await this.setChecking(i + j, j);
                    this.setDefaultColor();
                    if (this.text[i+j].character != this.pattern[j].character)
                        break;
                }
     
                // if p == t and pat[0...M-1] =
                // txt[i, i+1, ...i+M-1]
                if (j == M) {
                    this.found = true;
                    await this.setTextMatch(i, i + j);
                    break;
                }
            }
     
            // Calculate hash value for next window
            // of text: Remove leading digit, add
            // trailing digit
            if (i < N - M)
            {
                t = (d * (t - this.text[i].character.charCodeAt() * h) +
                    this.text[i + M].character.charCodeAt()) % q;
     
                // We might get negative value of t,
                // converting it to positive
                if (t < 0)
                    t = (t + q);
            }
        }
    }

}

export default RabinKarpAlgorithm;

