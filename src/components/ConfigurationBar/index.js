import './style.css';

import Constants from '../../constants';

function ConfigurationBar(props) {
    return (
        <div className="ConfigurationBar" style = {{height: Constants.configurationBarHeight, backgroundColor: Constants.configurationBarColor}}>
            {props.children}
        </div>
    );
}

export default ConfigurationBar;