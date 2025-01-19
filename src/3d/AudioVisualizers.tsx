import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AudioLoader, AudioListener, Audio, AudioAnalyser } from "three";
import VisualizerBars from "./VisualizerBars";
import Starfield from "./starfield/Starfield";
import calcMidFreqAmplitude from "../utils/calcMidFreqAmplitude";
import calcSubtleFrequencies from "../utils/calcSubtleFrequencies";

const AUDIO_FILE = "/Something.mp3";

export default function AudioVisualizers() {
  const analyserRef = useRef<AudioAnalyser | null>(null);
  // Tracks current and target rotations on the X and Y axes
  const starfieldRotationRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    timeOffset: 0,
    currentSpeed: 1000 // Base rotation speed
  });
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
      // Side effect: updates uAmplitude for visualizer bars
      calcMidFreqAmplitude(data, uniformsRef);
      // side effect: updates uRotation for starfield
      calcSubtleFrequencies(data, starfieldRotationRef);
    }
  });

  return (
    <>
      <VisualizerBars uniformsRef={uniformsRef} />
      <Starfield starfieldRotationRef={starfieldRotationRef}/>
    </>
  );
}