import React from 'react';
import Tabela from './componentes/Tabela';
import Provider from './Provider/Provider';
import Filters from './componentes/Filters';
import './App.css';

function App() {
  return (
    <Provider>
      <Filters />
      <Tabela />
    </Provider>
  );
}

export default App;
