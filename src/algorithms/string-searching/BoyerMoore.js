import BaseStringSearching from './BaseStringSearching';

class BoyerMooreAlgorithm extends BaseStringSearching {
    max(a,b) {
        return (a > b)? a: b;
    }
     

    badCharHeuristic() {
        this.badchar = {};
        for (let i = 0; i < this.pattern.length; i++) {
            this.badchar[this.pattern[i].char] = i;
        }
    }
     

    getBadCharHeuristicValue(value) {
        if(this.badchar.hasOwnProperty(value)) {
            return this.badchar[value];
        }
        else{
            return -1;
        }
    }
     
    innerSearch() {

        let m = this.pattern.length;
        let n = this.text.length;
    
        this.badCharHeuristic();
        this.setPatternLocation(0);
        this.setPatternPreprocessing();
    
        let s = 0;
        
        while(s <= (n - m)) {
            this.setPatternLocation(s);
            let j = m - 1;
    

            while(j >= 0) {
                this.setChecking(j + s, j);
                if(this.pattern[j].char == this.text[s + j].char) {
                    j--;
                }
                else {
                    break;
                }
            }

            if (j < 0) {
                this.found = true;
                this.setTextMatch(s, s + m);
                break;
            }
            s += this.max(1, j - this.getBadCharHeuristicValue(this.text[s + j].char));
        }
    }
}

export default BoyerMooreAlgorithm;