import { useMemo, useRef } from 'react';

interface StarfieldProps {
  count?: number;
}

// event listener for mouse button down (orbit controls in use) - pause starfield anim

export default function Starfield({ count = 2000 }: StarfieldProps) {
  const points = useRef(null);
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={particlePositions.length / 3}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color='#5786F5' />
    </points>
  );
}