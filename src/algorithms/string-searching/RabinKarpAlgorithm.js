import BaseStringSearching from './BaseStringSearching';

let d = 256;
let q = 5;

class RabinKarpAlgorithm extends BaseStringSearching {
    innerSearch() {
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
     
            
        this.setPatternLocation(0);
        this.setPatternPreprocessing();
        // Calculate the hash value of pattern and
        // first window of text
        for(i = 0; i < M; i++) {
            p = (d * p + this.pattern[i].char.charCodeAt()) % q;
            t = (d * t + this.text[i].char.charCodeAt()) % q;
        }
     
        // Slide the pattern over text one by one
        for(i = 0; i <= N - M; i++) {
            this.setPatternLocation(i);
            this.setCheckingHash(i, i + M);
            // Check the hash values of current
            // window of text and pattern. If the
            // hash values match then only
            // check for characters on by one
            if (p == t) {
                 
                /* Check for characters one by one */
                for(j = 0; j < M; j++)
                {
                    this.setChecking(i + j, j);
                    if (this.text[i+j].char != this.pattern[j].char)
                        break;
                }
     
                // if p == t and pat[0...M-1] =
                // txt[i, i+1, ...i+M-1]
                if (j == M) {
                    this.found = true;
                    this.setTextMatch(i, i + j);
                    break;
                }
            }
     
            // Calculate hash value for next window
            // of text: Remove leading digit, add
            // trailing digit
            if (i < N - M)
            {
                t = (d * (t - this.text[i].char.charCodeAt() * h) +
                    this.text[i + M].char.charCodeAt()) % q;
     
                // We might get negative value of t,
                // converting it to positive
                if (t < 0)
                    t = (t + q);
            }
        }
    }

}

export default RabinKarpAlgorithm;

