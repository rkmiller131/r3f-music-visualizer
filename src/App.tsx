import { Canvas } from '@react-three/fiber';
import Hud from './ui/Hud';
import Starfield from './3d/starfield/Starfield';
import VisualizerBars from './3d/VisualizerBars';

export default function App() {
  return (
    <div className='app'>
      <Hud />
      <Canvas>
        <Starfield />
        <VisualizerBars />
      </Canvas>
    </div>
  );
}