import './style.css';

import Constants from '../../constants';
import BasicSelect from '../BasicSelect';
import {useState} from 'react';

import {PathfindingPagesMapping} from './Pathfinding/PagesMapping';
import {SortingPagesMapping} from './Sorting/PagesMapping';
import {StringSearchingPagesMapping} from './String-searching/PagesMapping';
import {TreeBasedPagesMapping} from './TreeBased/PagesMapping';


function ModalInfo(props) {
    let infoPagesMapping;
    if(props.pageName === Constants.pathfindingPageTitle) {
        infoPagesMapping = PathfindingPagesMapping;
    }
    else if(props.pageName === Constants.sortingPageTitle) {
        infoPagesMapping = SortingPagesMapping;
    }    
    else if(props.pageName === Constants.stringsearchingPageTitle) {
        infoPagesMapping = StringSearchingPagesMapping;
    }    
    else if(props.pageName === Constants.treeBasedPageTitle) {
        infoPagesMapping = TreeBasedPagesMapping;
    }

    const pages = [];
    infoPagesMapping.forEach(infoPage => {
        pages.push(infoPage.name);
    });

    const getPageWithName = (name) => {
        for(let i = 0; i < infoPagesMapping.length; ++i) {
            if(infoPagesMapping[i].name == name) {
                return infoPagesMapping[i].page;
            }
        }
    }
    
    const [selectedInfoPage, setSelectedInfoPage] = useState(pages[0]);

    return (
        <div className="modal" onClick = {props.handleCloseInfo}>
        <div className="modalContent" onClick = {(e) => {e.stopPropagation();}}>

            <div className='ModelSelector'>
                <BasicSelect title ="" onChange = {setSelectedInfoPage} 
                        value={selectedInfoPage} values={pages}
                />
            </div>
            {getPageWithName(selectedInfoPage)}
        </div>
    </div>
    );
}

export default ModalInfo;