import { Environment, OrbitControls } from '@react-three/drei';

export default function GalaxyScene() {
  return (
    <>
      <Environment files='/galaxy.jpg' background />
      <ambientLight />
      <OrbitControls />
    </>
  );
}