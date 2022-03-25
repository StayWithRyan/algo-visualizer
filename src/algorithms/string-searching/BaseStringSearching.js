import Defaults from '../../defaults';

class BaseStringSearching {
    constructor(pattern, setPattern, text, setText, finishSearching, waitTimeout, copyArray) {
        this.stop = false;
        this.pattern = copyArray(pattern);
        this.setPattern = setPattern;
        this.text = copyArray(text);
        this.setText = setText;
        this.finishSearching = finishSearching;
        this.waitTimeout = waitTimeout;
        this.copyArray = copyArray;
        this.patternLocation = 0;
        this.found = false;
    }

    async search() {
        try{
            await Defaults.delay(500);

            await this.innerSearch();

            if(!this.found) {
                await this.setPatternNoMatch();
            }
            await Defaults.delay(1000);
            this.finishSearching(this.pattern);
        }
        catch(e) {
            if(e == Defaults.stopError) {
                // This is ok. Used for stopping algorithm from executing
            }
            else{
                throw e;
            }
        }
    }

    stopSearching() {
        this.stop = true;
    }

    async setChecking(i, j) {
        if(this.stop === true) {
            throw Defaults.stopError;
        }
        this.text[i].color = Defaults.searchingCheckingColor;
        this.pattern[j].color = Defaults.searchingCheckingColor;

        let newText =  this.copyArray(this.text);
        let newPattern =  this.copyArray(this.pattern);
        this.setText(newText);
        this.setPattern(newPattern, this.patternLocation);
        await Defaults.delay(this.waitTimeout);
    }

    async setPatternLocation(i) {
        if(this.stop === true) {
            throw Defaults.stopError;
        }
        
        let newPattern = this.copyArray(this.pattern);
        if(i) {
            this.patternLocation = i;
            this.setPattern(newPattern, i);
        }
        else{
            this.setPattern(newPattern, this.patternLocation);
        }
        await Defaults.delay(this.waitTimeout);
    }
    
    setDefaultColor() {
        if(this.stop === true) {
            throw Defaults.stopError;
        }
        for(let i = 0; i < this.text.length; ++i) {
            this.text[i].color = Defaults.searchingDefaultColor;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = Defaults.searchingDefaultColor;
        }
        let newText = this.copyArray(this.text);
        let newPattern = this.copyArray(this.pattern);
        this.setText(newText);
        this.setPattern(newPattern, this.patternLocation);
    }

    async setPatternNoMatch() {
        if(this.stop === true) {
            throw Defaults.stopError;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = Defaults.searchingNoMatchColor;
        }
        let newPattern = this.copyArray(this.pattern);
        this.setPattern(newPattern, this.patternLocation);

        await Defaults.delay(this.waitTimeout);
    }

    async setPatternPreprocessing() {
        if(this.stop === true) {
            throw Defaults.stopError;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = Defaults.searchingCheckingHashColor;
        }
        let newPattern = this.copyArray(this.pattern);
        this.setPattern(newPattern);

        await Defaults.delay(this.waitTimeout);
    }

    async setTextMatch(begin, end) {
        await this.setTextColor(begin, end, Defaults.searchingMatchColor)
    }

    async setCheckingHash(begin, end) {
        await this.setTextColor(begin, end, Defaults.searchingCheckingHashColor)
    }

    async setTextColor(begin, end, color) {
        if(this.stop === true) {
            throw Defaults.stopError;
        }
        for(let i = begin; i < end; ++i) {
            this.text[i].color = color;
        }
        let newText = this.copyArray(this.text);
        this.setText(newText);
        await Defaults.delay(this.waitTimeout);
    }
}

export default BaseStringSearching