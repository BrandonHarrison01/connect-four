import React from "react";

function Menu(props) {
  return (
    <div className='menu'>
      <h2>Main Menu</h2>
      <div className='menu-option'>
        <h3>Local</h3>
        <ul>
          <button onClick={() => props.history.push('/local-pvp')}>
            PVP
          </button>
          <button onClick={() => props.history.push('/local-ai')}>
            Bot
          </button>
        </ul>
      </div>
      <div className='menu-option'>
        <h3>Online</h3>
        <p className='coming'>Coming Soon</p>
      </div>
    </div>
  );
}

export default Menu;
