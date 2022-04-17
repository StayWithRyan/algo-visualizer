import './style.css';

import Constants from '../../constants';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from "react-router-dom";

function PageBar({name, clickBack}) {

    
    return (
        <>
            <Link style={{ textDecoration: "none"}} to="/">
                <IoIosArrowBack className='homeButton' style={{height: `${Constants.pageBarHeight}px`}} size={44} 
                        onClick={clickBack}
                />
            </Link>
            <div className="PageBar" 
                style = {{
                    height: Constants.pageBarHeight, backgroundColor: Constants.pageBarColor, color: Constants.mainColor,
                    borderBottom: `5px solid ${Constants.mainColor}`
                }} 
            >
                {name}
            </div>
        </>
    );
}

export default PageBar;