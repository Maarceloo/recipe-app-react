import React from 'react';
import './App.css';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';

function App() {
  return (
    <div data-testid="root">
      <Provider>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
