import './style.css';

import Constants from '../../constants';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ModalInfo from '../ModalInfo';

import { useState, useEffect } from 'react';

function ConfigurationBar(props) {
    let [infoOpened, setInfoOpened] = useState(false);

    const handleCloseInfo = () => {
        setInfoOpened(false);
    }
    
    return (
        <div className="ConfigurationBar" style = {{height: Constants.configurationBarHeight, backgroundColor: Constants.configurationBarColor}}>
            {props.children}
            <AiOutlineInfoCircle size={50} color={Constants.blueColor} style={{cursor: "pointer"}} onClick = {() => {setInfoOpened(true)}}/>
            {infoOpened && <ModalInfo pageName={props.pageName} algorithmName={props.algorithmName} handleCloseInfo={handleCloseInfo} />}
        </div>
    );
}

export default ConfigurationBar;