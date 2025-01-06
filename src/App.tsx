import { Canvas } from '@react-three/fiber';
import Hud from './ui/Hud';
import { Environment, OrbitControls } from '@react-three/drei';

export default function App() {
  return (
    <div className='app'>
      <Hud />
      <Canvas>
        <Environment preset="night" background />
        <ambientLight />
        <OrbitControls />
      </Canvas>
    </div>
  )
}