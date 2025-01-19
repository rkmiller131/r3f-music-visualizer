import { Canvas } from '@react-three/fiber';
import Hud from './ui/Hud';
import AudioVisualizers from './3d/AudioVisualizers';

export default function App() {
  return (
    <div className='app'>
      <Hud />
      <Canvas>
        <AudioVisualizers />
      </Canvas>
    </div>
  );
}