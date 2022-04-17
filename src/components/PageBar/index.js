import './style.css';
import Constants from '../../constants';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

function PageBar({name}) {
    const navigate = useNavigate();
    
    return (
        <>
            <IoIosArrowBack className='homeButton' style={{height: `${Constants.pageBarHeight}px`}} size={44} 
                        onClick={() => navigate("/")}
            />
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