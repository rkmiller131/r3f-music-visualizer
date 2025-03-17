import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AudioLoader, AudioListener, Audio, AudioAnalyser } from "three";
import VisualizerBars from "./VisualizerBars";
import Starfield from "./starfield/Starfield";
import calcMidFreqAmplitude from "../utils/calcMidFreqAmplitude";
import calcStarfieldRotationSpeed from "../utils/calcStarfieldRotationSpeed";
import PlanetSphere from "./PlanetSphere";

// const AUDIO_FILE = "/Something.mp3";
const AUDIO_FILE = "/lightInTheDark.mp3";

export default function AudioVisualizers() {
  const analyserRef = useRef<AudioAnalyser | null>(null);
  const starfieldRotationRef = useRef({
    currentSpeed: 12, // Base rotation speed
    targetSpeed: 12,  // Target to interpolate towards
    currentAngle: 0,  // Actual rotation angle
  });
  const uniformsRef = useRef({
    uAmplitude: { value: 0 },
  });

  useEffect(function setUpAudioAndAnalyzer () {
    const fftSize = 32;
    const listener = new AudioListener();
    const audio = new Audio(listener);

    const loader = new AudioLoader();
    loader.load(AUDIO_FILE, (buffer) => {
      audio.setBuffer(buffer);
      // audio.play();
    });

    analyserRef.current = new AudioAnalyser(audio, fftSize);

    return () => {
      audio.stop();
    };
  }, []);

  useFrame(({ clock }) => {
    if (analyserRef.current) {
      const data = analyserRef.current.getFrequencyData();
      // Side effect: updates uAmplitude for visualizer bars
      calcMidFreqAmplitude(data, uniformsRef);
      calcStarfieldRotationSpeed(data, starfieldRotationRef, clock.getDelta());
    }
  });

  return (
    <>
      <VisualizerBars uniformsRef={uniformsRef} />
      <Starfield starfieldRotationRef={starfieldRotationRef}/>
      <PlanetSphere />
    </>
  );
}