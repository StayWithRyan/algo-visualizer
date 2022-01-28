const Defaults = {
    sortingSleepMin: 10,
    sortingSleepMax: 2000,
    sortingSleepDefault: 500,
    sortingSleepStep: 10,

    sortingDefaultColor: "blue",
    sortingCheckingColor: "yellow",
    sortingSwappingColor: "red",

    arraySizeMin: 10,
    arraySizeMax: 100,
    arraySizeDefault: 10,
    arraySizeStep: 10,

    searchingSleepMin: 100,
    searchingSleepMax: 2000,
    searchingSleepDefault: 500,
    searchingSleepStep: 50,

    searchingDefaultColor: "white",
    searchingCheckingColor: "#d3e376",
    searchingCheckingHashColor: "#6ea1ff",
    searchingMatchColor: "#07e35b",
    searchingNoMatchColor: "#ff6d59",

    NO_OF_CHARS : 256,

    delay : ms => new Promise(res => setTimeout(res, ms))
}

export default Defaults;