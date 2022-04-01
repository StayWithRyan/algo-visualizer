import Constants from '../../constants';
import SearchingConstants from '../../screens/StringsearchingPage/constants';
import {addStep} from '../../screens/StringsearchingPage/stringsearchingHelpers';

class BaseStringSearching {
    constructor(pattern, text) {
        this.pattern = pattern;
        this.text = text;
        this.patternLocation = -1;
        this.found = false;
    }

    search() {
        this.innerSearch();

        if(!this.found) {
            this.setPatternNoMatch();
        }
    }

    setChecking(i, j) {
        this.text[i].color = SearchingConstants.checkingColor;
        this.pattern[j].color = SearchingConstants.checkingColor;
        addStep(this.pattern, this.patternLocation, this.text);
        this.setDefaultColor();
    }

    setPatternLocation(location) {
        if(this.patternLocation !== location) {
            addStep(this.pattern, location, this.text);
        }
        this.patternLocation = location;
    }
    
    setDefaultColor() {
        for(let i = 0; i < this.text.length; ++i) {
            this.text[i].color = SearchingConstants.defaultColor;
        }
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.defaultColor;
        }
    }

    setPatternNoMatch() {
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.noMatchColor;
        }
        addStep(this.pattern, this.patternLocation, this.text);
    }

    setPatternPreprocessing() {
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.checkingHashColor;
        }
        addStep(this.pattern, this.patternLocation, this.text);
        for(let i = 0; i < this.pattern.length; ++i) {
            this.pattern[i].color = SearchingConstants.defaultColor;
        }
    }

    setTextMatch(begin, end) {
        for(let i = begin; i < end; ++i) {
            this.text[i].color = SearchingConstants.matchColor;
        }
        addStep(this.pattern, this.patternLocation, this.text);
    }

    setCheckingHash(begin, end) {
        for(let i = begin; i < end; ++i) {
            this.text[i].color = SearchingConstants.checkingHashColor;
        }
        addStep(this.pattern, this.patternLocation, this.text);
        this.setDefaultColor();
    }
}

export default BaseStringSearching;