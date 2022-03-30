const Constants = {
    mainColor: "#9c27b0",
    textColor: "#dbd8e3",
    navBarColor: "#2a2438",
    configurationBarColor: "#352f44",
    
    drawInterval: 20,
    
    navBarHeight: 45,
    configurationBarHeight: 60,

    delay : ms => new Promise(res => setTimeout(res, ms)),
    getRandomInt : max => Math.floor(Math.random() * max),
    stopError: "Preventing from executing"
}

export default Constants;