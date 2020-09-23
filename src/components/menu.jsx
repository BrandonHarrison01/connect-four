import React from "react";

function Menu(props) {
  return (
    <div className='menu'>
      <div className='menu-option'>
        <h2>Main Menu</h2>
        <button onClick={() => props.history.push('/local-pvp')}>
          PVP
        </button>
        <button onClick={() => props.history.push('/local-ai')}>
          Bot
        </button>
      </div>
    </div>
  );
}

export default Menu;
