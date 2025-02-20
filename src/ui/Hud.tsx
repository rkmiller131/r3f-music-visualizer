import { useState } from 'react';

import '../css/Hud.css';

// accept a fn to call when play button is clicked;
// define a fn locally when play button is clicked to set isPlaying to true
// and call that cb
export default function Hud() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className='hud-overlay'>
      <div className='hud-doors'>
        Welcome to Space
      </div>
      <img src='/shipWindow.png' alt='Spaceship HUD' />
    </div>
  )
}