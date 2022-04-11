import logo from './logo.svg';
import NavBar from "./screens/NavBar";
import Constants from "./constants";
import './App.css';

function App() {
  return (
    <div style = {{minWidth: `${Constants.minAppWidth}px`, backgroundColor: Constants.mainBackground, height: "100vh"}}>
      <NavBar/>
    </div>
  );
}

export default App;
