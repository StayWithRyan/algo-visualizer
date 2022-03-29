import Constants from '../../../constants';

class BaseSorting {
    constructor(handleStop, waitTimeout) {
        this.stopFlag = false;
        this.handleStop = handleStop;
        this.waitTimeout = waitTimeout;
    }

    async algorithm() {
        try{
            await this.algorithmlInner(this.tree);
            this.handleStop();
        }
        catch(e) {
            if(e ==  Constants.stopError) {
                // This is ok. Used for stopping algorithm from executing
            }
            else{
                throw e;
            }
        }
    }

    stop() {
        this.stopFlag = true;
    }
}

export default BaseSorting