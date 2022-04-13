import './style.css';

function NavLink({text, logo, id, onClick}) {
    return (
        <div className={`NavPage NavPage${id}`} 
            onClick = {onClick}
        >
            <img width="200" height="200" src={logo}/>
            <div className='PageText'>
                {text}
            </div>
        </div>
    );
}

export default NavLink;