const Helpers = {
    delay : async (ms) => { if(ms) await new Promise(res => setTimeout(res, ms))},
    getRandomInt : max => Math.floor(Math.random() * max)
}

export default Helpers;