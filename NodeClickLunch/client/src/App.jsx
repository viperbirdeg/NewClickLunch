import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api').then((res) => res.json()).then((datos) => setData(datos.message));
  }, []);
  
  return (
    <div className="App">
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
