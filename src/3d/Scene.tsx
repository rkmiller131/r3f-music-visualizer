import { Environment, OrbitControls } from '@react-three/drei';

// export default function Scene() {
//   return (
//     <>
//       <Environment files='/galaxy.jpg' background />
//       <ambientLight />
//       <OrbitControls />
//     </>
//   );
// }

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { fragmentShader, vertexShader } from "./shaders";

export default function Scene2() {
  const analyserRef = useRef(null);
  const uniformsRef = useRef({
    uAmplitude: { value: 0 },
  });

  useEffect(() => {
    const fftSize = 32;
    const listener = new THREE.AudioListener();
    const audio = new THREE.Audio(listener);

    const file = "/Something.mp3";
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      const loader = new THREE.AudioLoader();
      loader.load(file, (buffer) => {
        audio.setBuffer(buffer);
        audio.play();
      });
    } else {
      const mediaElement = new Audio(file);
      mediaElement.play();
      audio.setMediaElementSource(mediaElement);
    }

    analyserRef.current = new THREE.AudioAnalyser(audio, fftSize);

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