import './style.css';

function ConfigurationBar(props) {
    return (
        <div className="ConfigurationBar">
            {props.children}
        </div>
    );
}

export default ConfigurationBar;