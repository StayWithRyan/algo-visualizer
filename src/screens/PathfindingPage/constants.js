const PathfindingConstants = {
    sleepMin: 25,
    sleepMax: 1000,
    sleepDefault: 250,
    sleepStep: 75,


    generatingDelayTimeout: 10,

    gridColor: "#252527",
    emptyColor: "black",
    blockColor: ["#16b8f3", "#331219"],
    checkingColor: ["black", "#deb1c4"],
    pathColor: ["#bac1cc", "#be004f"],
    startColor: "#34a953",
    targetColor: "#34a953",

    elementSize: 30,

    DFSName: "Пошук у глибину",
    BFSName: "Пошук у ширину (Алгоритм Дейкстри)",
    BestFirstSearchName: "Пошук 'Найкращий - перший'",
    AStartName: "Алгоритм пошуку A*",

    RecursiveDivisionName: "Рекурсивний поділ",
    EllersAlgorithmName: "Алгоритм Ейлера",
    BasicRandomMazeName: "Випадкові блоки"
}

export default PathfindingConstants;