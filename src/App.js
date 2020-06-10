import React from 'react';
import { Route } from 'react-router-dom'

import Menu from './components/menu'
import PvpBoard from './components/pvp-board';

function App() {
  return (
    <div className="App">
      <h1>Connect 4</h1>
      <Route exact path='/' component={Menu} />
      <Route path='/local-pvp' component={PvpBoard} />
    </div>
  );
}

export default App;
