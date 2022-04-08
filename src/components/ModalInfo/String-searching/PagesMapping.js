import GeneralInfo from './GeneralInfo';
import NaiveInfo from './NaiveInfo';
import OptimizedNaiveInfo from './OptimizedNaiveInfo';
import KMPInfo from './KMPInfo';
import BoyerMooreInfo from './BoyerMooreInfo';
import RabinKarpInfo from './RabinKarpInfo';

let StringSearchingPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "General Info"
    },
    {
        page : <NaiveInfo/>,
        name: "NaiveInfo"
    },
    {
        page : <OptimizedNaiveInfo/>,
        name: "OptimizedNaiveInfo"
    },
    {
        page : <KMPInfo/>,
        name: "KMPInfo"
    },
    {
        page : <BoyerMooreInfo/>,
        name: "BoyerMooreInfo"
    },
    {
        page : <RabinKarpInfo/>,
        name: "RabinKarpInfo"
    }
];

export {StringSearchingPagesMapping};