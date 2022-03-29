import Constants from '../../constants';
import SearchingConstants from '../../screens/StringsearchingPage/constants';

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
            await Constants.delay(500);

            await this.innerSearch();

            if(!this.found) {
                await this.setPatternNoMatch();
            }
            await Constants.delay(1000);
            this.finishSearching(this.pattern);
        }
        catch(e) {
            if(e == Constants.stopError) {
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
            throw Constants.stopError;
        }
        this.text[i].color = SearchingConstants.checkingColor;
        this.pattern[j].color = SearchingConstants.checkingColor;

        let newText =  this.copyArray(this.text);
        let newPattern =  this.copyArray(this.pattern);
        this.setText(newText);
        this.setPattern(newPattern, this.patternLocation);
        await Constants.delay(this.waitTimeout);
    }

    async setPatternLocation(i) {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        
        let newPattern = this.copyArray(this.pattern);
        if(i) {
            this.patternLocation = i;
            this.setPattern(newPattern, i);
        }
        else{
            this.setPattern(newPattern, this.patternLocation);
        }
        await Constants.delay(this.waitTimeout);
    }
    
    setDefaultColor() {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        for(let i = 0; i < this.text.length; ++i) {
            this.text[i].color = SearchingConstants.defaultColor;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.defaultColor;
        }
        let newText = this.copyArray(this.text);
        let newPattern = this.copyArray(this.pattern);
        this.setText(newText);
        this.setPattern(newPattern, this.patternLocation);
    }

    async setPatternNoMatch() {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.noMatchColor;
        }
        let newPattern = this.copyArray(this.pattern);
        this.setPattern(newPattern, this.patternLocation);

        await Constants.delay(this.waitTimeout);
    }

    async setPatternPreprocessing() {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.checkingHashColor;
        }
        let newPattern = this.copyArray(this.pattern);
        this.setPattern(newPattern);

        await Constants.delay(this.waitTimeout);
    }

    async setTextMatch(begin, end) {
        await this.setTextColor(begin, end, SearchingConstants.matchColor)
    }

    async setCheckingHash(begin, end) {
        await this.setTextColor(begin, end, SearchingConstants.checkingHashColor)
    }

    async setTextColor(begin, end, color) {
        if(this.stop === true) {
            throw Constants.stopError;
        }
        for(let i = begin; i < end; ++i) {
            this.text[i].color = color;
        }
        let newText = this.copyArray(this.text);
        this.setText(newText);
        await Constants.delay(this.waitTimeout);
    }
}

export default BaseStringSearching