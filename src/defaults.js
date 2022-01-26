const Defaults = {
    sleepMin: 10,
    sleepMax: 2000,
    sleepDefault: 500,
    sleepStep: 10,
    arraySizeMin: 10,
    arraySizeMax: 100,
    arraySizeDefault: 10,
    arraySizeStep: 10,
    delay : ms => new Promise(res => setTimeout(res, ms)),
    sortingDefaultColor: "blue",
    sortingCheckingColor: "yellow",
    sortingSwappingColor: "red"
}

export default Defaults;