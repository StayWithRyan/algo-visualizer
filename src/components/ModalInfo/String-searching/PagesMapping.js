import GeneralInfo from './GeneralInfo';
import NaiveInfo from './NaiveInfo';
import OptimizedNaiveInfo from './OptimizedNaiveInfo';
import KMPInfo from './KMPInfo';
import BoyerMooreInfo from './BoyerMooreInfo';
import RabinKarpInfo from './RabinKarpInfo';

import SearchingConstants from '../../../screens/StringsearchingPage/constants';

let StringSearchingPagesMapping = [
    {
        page: <GeneralInfo/>,
        name: "Загальна інформація про пошук стрічки"
    },
    {
        page: <NaiveInfo/>,
        name: SearchingConstants.NaiveAlgorithmName
    },
    {
        page: <OptimizedNaiveInfo/>,
        name: SearchingConstants.OptimizedNaiveAlgorithmName
    },
    {
        page: <KMPInfo/>,
        name: SearchingConstants.KMPAlgorithmName
    },
    {
        page: <BoyerMooreInfo/>,
        name: SearchingConstants.BoyerMooreAlgorithmName
    },
    {
        page: <RabinKarpInfo/>,
        name: SearchingConstants.RabinKarpAlgorithmName
    }
];

export {StringSearchingPagesMapping};