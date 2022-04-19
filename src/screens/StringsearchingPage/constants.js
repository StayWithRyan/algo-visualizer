import Constants from "../../constants";

const SearchingConstants = {
    sleepMin: 100,
    sleepMax: 1000,
    sleepDefault: 550,
    sleepStep: 75,


    defaultColor: Constants.textColor,
    checkingColor: Constants.yellowColor,
    checkingHashColor: Constants.blueColor,
    matchColor: Constants.greenColor,
    noMatchColor: Constants.crimsonColor,

    NaiveAlgorithmName: "Прямий пошук",
    OptimizedNaiveAlgorithmName: "Оптимізований прямий пошук",
    KMPAlgorithmName: "Алгоритм Кнута - Морріса - Пратта",
    BoyerMooreAlgorithmName: "Алгоритм Боєра - Мура",
    RabinKarpAlgorithmName: "Алгоритм Рабіна - Карпа"
}

export default SearchingConstants;