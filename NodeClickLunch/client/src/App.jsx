import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBarHome from './components/home/NavBarHome.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api').then((res) => res.json()).then((datos) => setData(datos.message));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBarHome />
      </BrowserRouter>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h1>{!data ? "Loading..." : data}</h1>
        </p>
      </header>
    </div>
  );
}

export default App;
