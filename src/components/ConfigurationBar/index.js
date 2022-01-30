import './style.css';

import Defaults from '../../defaults';

function ConfigurationBar(props) {
    return (
        <div className="ConfigurationBar" style = {{height: Defaults.configurationBarHeight, backgroundColor: Defaults.configurationBarColor}}>
            {props.children}
        </div>
    );
}

export default ConfigurationBar;