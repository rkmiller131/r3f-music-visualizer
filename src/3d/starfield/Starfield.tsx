import { useMemo, useRef } from 'react';
import GalaxyScene from './GalaxyScene';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';

interface StarfieldProps {
  count?: number;
}

// event listener for mouse button down (orbit controls in use) - pause starfield anim

export default function Starfield({ count = 2000 }: StarfieldProps) {
  const textureLoader = new TextureLoader();
  const starMap = textureLoader.load('/star.svg');
  const points = useRef(null);
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() / 10;
    }
  })

  return (
    <>
      <GalaxyScene />
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.015} map={starMap} />
      </points>
    </>
  );
}