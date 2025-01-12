import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function AudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);

  // return (
  //   <div className="w-screen h-screen bg-black">
  //     {!isPlaying && (
  //       <button
  //         onClick={() => setIsPlaying(true)}
  //         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  //                    px-6 py-3 bg-purple-600 text-white rounded-lg
  //                    hover:bg-purple-700 transition-colors"
  //       >
  //         Play
  //       </button>
  //     )}
  //     <Canvas>{isPlaying && <Scene />}</Canvas>
  //   </div>
  // );
  return (
    <Canvas><Scene /></Canvas>
  )
}