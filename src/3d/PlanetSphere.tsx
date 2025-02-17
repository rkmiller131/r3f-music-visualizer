import { fragmentShader, vertexShader } from "./shaders/planetSphere.shaders";

export default function PlanetSphere () {
  return (
    <mesh position={[0, 0.5, 0]}>
      <icosahedronGeometry args={[1.75, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}