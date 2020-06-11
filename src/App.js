import React from 'react';
import { Route, Link } from 'react-router-dom'

import Menu from './components/menu'
import PvpBoard from './components/pvp-board';

function App(props) {

  return (
    <div className="App">
      <header>
        <Link to='/' className='title'>Connect 4</Link>
      </header>
      <Route exact path='/' component={Menu} />
      <Route path='/local-pvp' component={PvpBoard} />
    </div>
  );
}

export default App;
