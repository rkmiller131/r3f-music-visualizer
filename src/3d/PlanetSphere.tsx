import { fragmentShader, vertexShader } from "./shaders/planetSphere.shaders";

export default function PlanetSphere () {
  return (
    <mesh>
      <icosahedronGeometry args={[1.75, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}