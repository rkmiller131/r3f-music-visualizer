import { Canvas } from '@react-three/fiber';
import Hud from './ui/Hud';
import Scene from './3d/Scene';
import Starfield from './3d/Starfield';

export default function App() {
  return (
    <div className='app'>
      <Hud />
      <Canvas>
        <Scene />
        <Starfield />
      </Canvas>
    </div>
  );
}