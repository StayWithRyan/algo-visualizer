const Helpers = {
    delay : ms => new Promise(res => setTimeout(res, ms)),
    getRandomInt : max => Math.floor(Math.random() * max)
}

export default Helpers;