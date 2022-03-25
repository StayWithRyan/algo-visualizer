const Defaults = {

    // General
    mainColor: "#9c27b0",
    textColor: "#dbd8e3",
    navBarColor: "#2a2438",
    configurationBarColor: "#352f44",
    
    
    navBarHeight: 45,
    configurationBarHeight: 60,
    
    // Sorting
    sortingSleepMin: 10,
    sortingSleepMax: 2000,
    sortingSleepDefault: 500,
    sortingSleepStep: 10,

    sortingDefaultColor: "#6ea1ff",
    sortingCheckingColor: "#dfa47f",
    sortingSwappingColor: "#eb6b64",

    arraySizeMin: 10,
    arraySizeMax: 100,
    arraySizeDefault: 10,
    arraySizeStep: 10,

    // String-searching
    searchingSleepMin: 100,
    searchingSleepMax: 2000,
    searchingSleepDefault: 500,
    searchingSleepStep: 50,

    searchingDefaultColor: "white",
    searchingCheckingColor: "#fab366",
    searchingCheckingHashColor: "#6ea1ff",
    searchingMatchColor: "#07e35b",
    searchingNoMatchColor: "#ff6d59",
    
    // Pathfinding
    pathfindingSleepMin: 10,
    pathfindingSleepMax: 300,
    pathfindingSleepDefault: 50,
    pathfindingSleepStep: 15,

    pathfindingGeneratingDelayTimeout: 1,

    pathfindingElementSize: 30,
    pathfindingGridColor: "black",
    pathfindingBlockColor: ["#14856b", "#352f44"],
    pathfindingCheckingColor: ["#d8e7c6", "#dfa47f"],
    pathfindingPathColor: ["#e29b41", "#eb6b0a"],
    pathfindingBegginingColor: "#eb6b64",
    pathfindingEmptyColor: "white",
    pathfindingStartAndTargetColor: "purple",

    // Tree Based 
    treebasedSleepMin: 100,
    treebasedSleepMax: 1000,
    treebasedSleepDefault: 1000,
    treebasedSleepStep: 15,

    treeSizeMin: 5,
    treeSizeDefault: 15,
    treeSizeStep: 1,

    treeNodeElementSize: 50,

    treeNodeTextColor: "black",

    // general
    delay : ms => new Promise(res => setTimeout(res, ms)),
    getRandomInt : max => Math.floor(Math.random() * max),
    stopError: "Preventing from executing"
}

export default Defaults;