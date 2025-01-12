import { Canvas } from '@react-three/fiber';
import Hud from './ui/Hud';
import Scene from './3d/Scene';
import Starfield from './3d/Starfield';
import AudioVisualizer from './3d/AudioVisualizer';

export default function App() {
  return (
    <div className='app'>
      <Hud />
      {/* <Hud />
      <Canvas>
        <Scene />
        <Starfield />
      </Canvas> */}
      <AudioVisualizer />
    </div>
  );
}