// export default function calcSubtleFrequencies(data: Uint8Array, starfieldRotationRef: React.RefObject<any>) {
//   // holds a rolling history of freq averages
//   const previousFreqs: number[] = [];
//   const HISTORY_SIZE = 30; // Store last 30 frames of frequency data

//   // focus on mid-high frequencies (avoid very high frequencies which might be noisy)
//   const startIndex = Math.floor(data.length * 0.5);  // Start from middle frequencies
//   const endIndex = Math.floor(data.length * 0.8);    // Avoid highest frequencies

//   let subtleFreqSum = 0;
//   let relevantFreqCount = 0;

//   // Look for subtle frequencies
//   for (let i = startIndex; i < endIndex; i++) {
//     const freq = data[i];
//     // Only consider frequencies below a certain threshold (quiet sounds)
//     // Typical threshold for quiet sounds might be around 40-60 in a 0-255 range
//     if (freq > 15 && freq < 255) {
//       subtleFreqSum += freq;
//       relevantFreqCount++;
//     }
//   }

//   // Average of subtle frequencies
//   const subtleFreqAvg = relevantFreqCount > 0 ? subtleFreqSum / relevantFreqCount : 0;

//   // Store this average in the history
//   previousFreqs.push(subtleFreqAvg);
//   if (previousFreqs.length > HISTORY_SIZE) {
//     previousFreqs.shift();
//   }

//   // Calculate the variation in recent frequency data
//   // This helps detect "still" moments vs active moments
//   const average = previousFreqs.reduce((a, b) => a + b, 0) / previousFreqs.length;
//   const variance = previousFreqs.reduce((a, b) => a + Math.pow(b - average, 2), 0) / previousFreqs.length;

//   // Only respond significantly when we detect low variance (still moments)
//   const stillnessFactor = Math.max(0, 1 - (variance / 100));  // Higher during still moments

//   // Normalize and apply stillness factor
//   const normalizedValue = (subtleFreqAvg / 60) * stillnessFactor * 0.05;  // Reduced multiplier for subtlety

//   // Update target rotations with more subtle movement
//   starfieldRotationRef.current.targetX = normalizedValue * Math.sin(Date.now() / 1000);
//   starfieldRotationRef.current.targetY = normalizedValue * Math.cos(Date.now() / 1000);

//   // Very smooth interpolation for gentle movement
//   const interpolationFactor = 0.03;  // Reduced for smoother transitions
//   starfieldRotationRef.current.currentX += (starfieldRotationRef.current.targetX - starfieldRotationRef.current.currentX) * interpolationFactor;
//   starfieldRotationRef.current.currentY += (starfieldRotationRef.current.targetY - starfieldRotationRef.current.currentY) * interpolationFactor;

// }

export default function calcSubtleFrequencies(data: Uint8Array, starfieldRotationRef: React.RefObject<any>) {
  // holds a rolling history of freq averages
  const previousFreqs: number[] = [];
  const HISTORY_SIZE = 30; // Store last 30 frames of frequency data

  // Analyze full frequency spectrum
  let lowFreqSum = 0;
  let midFreqSum = 0;
  let highFreqSum = 0;
  let totalSum = 0;

  // Split frequency data into ranges
  const lowEnd = Math.floor(data.length * 0.33);
  const midEnd = Math.floor(data.length * 0.66);

  // Calculate sums for each frequency range
  for (let i = 0; i < data.length; i++) {
    const freq = data[i];
    if (freq > 15) {  // Basic noise threshold
      totalSum += freq;

      if (i < lowEnd) {
        lowFreqSum += freq;
      } else if (i < midEnd) {
        midFreqSum += freq;
      } else {
        highFreqSum += freq;
      }
    }
  }

  // Calculate the dominant frequency range
  const maxSum = Math.max(lowFreqSum, midFreqSum, highFreqSum);

  // Adjust rotation speed based on dominant frequency range
  let targetSpeed = 1000; // Base speed
  if (maxSum === highFreqSum && highFreqSum > 0) {
    targetSpeed = 500; // Faster for high frequencies
  } else if (maxSum === midFreqSum && midFreqSum > 0) {
    targetSpeed = 750; // Medium speed for mid frequencies
  } else if (maxSum === lowFreqSum && lowFreqSum > 0) {
    targetSpeed = 1000; // Slower for low frequencies
  }

  // Smooth speed transitions
  starfieldRotationRef.current.currentSpeed += (targetSpeed - starfieldRotationRef.current.currentSpeed) * 0.1;

  // Normalize the total frequency sum
  const normalizedValue = (totalSum / (data.length * 255)) * 0.15;

  // Update time offset for continuous rotation
  starfieldRotationRef.current.timeOffset += 1 / starfieldRotationRef.current.currentSpeed;

  // Calculate rotation with varying speed
  starfieldRotationRef.current.targetX = normalizedValue * Math.sin(starfieldRotationRef.current.timeOffset);
  starfieldRotationRef.current.targetY = normalizedValue * Math.cos(starfieldRotationRef.current.timeOffset);

  // Smooth interpolation for rotation
  const interpolationFactor = 0.03;
  starfieldRotationRef.current.currentX += (starfieldRotationRef.current.targetX - starfieldRotationRef.current.currentX) * interpolationFactor;
  starfieldRotationRef.current.currentY += (starfieldRotationRef.current.targetY - starfieldRotationRef.current.currentY) * interpolationFactor;


}