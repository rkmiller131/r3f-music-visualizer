export default function calcStarfieldRotationSpeed(
  data: Uint8Array,
  starfieldRotationRef: React.RefObject<any>,
  deltaTime: number
) {
  // Analyze full frequency spectrum
  let lowFreqSum = 0;
  let midFreqSum = 0;
  let highFreqSum = 0;

  // Split frequency data into ranges
  const lowEnd = Math.floor(data.length * 0.45);
  const midEnd = Math.floor(data.length * 0.7);

  // Calculate sums for each frequency range
  for (let i = 0; i < data.length; i++) {
    const freq = data[i];
    if (freq > 10) {  // Basic noise threshold
      if (i < lowEnd) {
        lowFreqSum += freq > 150 ? (i + 2.25) : 0;
      } else if (i < midEnd) {
        midFreqSum += freq > 100 ? (i + 2) : 0;
      } else {
        highFreqSum += (i + 2.25);
      }
    }
  }

  // Calculate the dominant frequency range
  const maxSum = Math.max(lowFreqSum, midFreqSum, highFreqSum);
  // const isLow = maxSum === lowFreqSum ? 'Low Frequency' : '';
  // const isMid = maxSum === midFreqSum ? 'Mid Frequency' : '';
  // const isHigh = maxSum === highFreqSum ? 'High Frequency' : '';

  // console.log(isLow ? isLow : isMid ? isMid : isHigh)

  // Adjust rotation speed based on dominant frequency range
  if (maxSum === highFreqSum && highFreqSum > 0) {
    starfieldRotationRef.current.targetSpeed = 0.1; // Faster for high frequencies
  } else if (maxSum === midFreqSum && midFreqSum > 0) {
    starfieldRotationRef.current.targetSpeed = 0.25; // Medium speed for mid frequencies
  } else if (maxSum === lowFreqSum && lowFreqSum > 0) {
    starfieldRotationRef.current.targetSpeed = 0.75; // Slower for low frequencies
  }

  // Smooth speed transition
  starfieldRotationRef.current.currentSpeed += (
    starfieldRotationRef.current.targetSpeed - starfieldRotationRef.current.currentSpeed
  ) * 0.6; // Adjust this value to change how quickly the speed changes

  // Angle updates based on current speed
  starfieldRotationRef.current.currentAngle += (10 / starfieldRotationRef.current.currentSpeed) * deltaTime * Math.PI;
}