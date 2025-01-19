import { fragmentShader, vertexShader } from "./shaders";

interface VisualizerBarsProps {
  uniformsRef: React.RefObject<any>;
}

export default function VisualizerBars({ uniformsRef }: VisualizerBarsProps) {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
}