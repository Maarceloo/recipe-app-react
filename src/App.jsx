import React from 'react';
import './App.css';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
