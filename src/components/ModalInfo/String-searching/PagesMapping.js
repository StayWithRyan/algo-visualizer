import GeneralInfo from './GeneralInfo';
import NaiveInfo from './NaiveInfo';
import OptimizedNaiveInfo from './OptimizedNaiveInfo';
import KMPInfo from './KMPInfo';
import BoyerMooreInfo from './BoyerMooreInfo';
import RabinKarpInfo from './RabinKarpInfo';

let StringSearchingPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "Загальна інформація"
    },
    {
        page : <NaiveInfo/>,
        name: "Прямий пошук"
    },
    {
        page : <OptimizedNaiveInfo/>,
        name: "Оптимізований прямий пошук"
    },
    {
        page : <KMPInfo/>,
        name: "Алгоритм Кнута - Морріса - Пратта"
    },
    {
        page : <BoyerMooreInfo/>,
        name: "Алгоритм Боєра - Мура"
    },
    {
        page : <RabinKarpInfo/>,
        name: "Алгоритм Рабіна - Карпа"
    }
];

export {StringSearchingPagesMapping};