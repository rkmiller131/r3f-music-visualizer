import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AudioLoader, AudioListener, Audio, AudioAnalyser } from "three";
import { fragmentShader, vertexShader } from "./shaders";

const AUDIO_FILE = "/Something.mp3";

export default function VisualizerBars() {
  const analyserRef = useRef<AudioAnalyser | null>(null);
  const uniformsRef = useRef({
    uAmplitude: { value: 0 },
  });

  useEffect(() => {
    const fftSize = 32;
    const listener = new AudioListener();
    const audio = new Audio(listener);

    const loader = new AudioLoader();
    loader.load(AUDIO_FILE, (buffer) => {
      audio.setBuffer(buffer);
      audio.play();
    });

    analyserRef.current = new AudioAnalyser(audio, fftSize);

    return () => {
      audio.stop();
    };
  }, []);

  useFrame(() => {
    if (analyserRef.current) {
      const data = analyserRef.current.getFrequencyData();

      // Calculate the average of a few mid-to-end range frequencies (mild bass beat)
      let sum = 0;
      for (let i = 10; i < 16; i++) {
        sum += data[i];
      }
      const average = sum / 6;

      // Normalize and smooth the value
      const normalizedValue = Math.min(average / 128, 1.0);
      uniformsRef.current.uAmplitude.value +=
        (normalizedValue - uniformsRef.current.uAmplitude.value) * 0.1;
    }
  });

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