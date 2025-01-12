import { Environment, OrbitControls } from '@react-three/drei';

export default function Scene() {
  return (
    <>
      <Environment files='/galaxy.jpg' background />
      <ambientLight />
      <OrbitControls />
    </>
  );
}