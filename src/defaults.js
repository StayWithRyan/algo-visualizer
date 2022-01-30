const Defaults = {

    mainColor: "#9c27b0",
    textColor: "#dbd8e3",
    navBarColor: "#2a2438",
    configurationBarColor: "#352f44",
    
    
    navBarHeight: 45,
    configurationBarHeight: 60,
    
    sortingSleepMin: 10,
    sortingSleepMax: 2000,
    sortingSleepDefault: 500,
    sortingSleepStep: 10,

    sortingDefaultColor: "#6ea1ff",
    sortingCheckingColor: "#d3e376",
    sortingSwappingColor: "#ff6d59",

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

    
    pathfindingSleepMin: 100,
    pathfindingSleepMax: 300,
    pathfindingSleepDefault: 150,
    pathfindingSleepStep: 15,

    pathfindingElementSize: 30,
    pathfindingGridColor: "#2a2438",
    pathfindingBlockColor: "red",
    pathfindingEmptyColor: "#d3e376",
    pathfindingStartColor: "green",
    pathfindingTargetColor: "purple",

    delay : ms => new Promise(res => setTimeout(res, ms))
}

export default Defaults;