/**
 * Calculates the average amplitude for mid frequencies from audio data,
 * normalizes it, and applies a smoothing effect to update a uniform value.
 *
 * @param {Uint8Array} data - An array of frequency data from an audio analyzer.
 * @param {React.RefObject<any>} uniformsRef - A reference to an object holding shader uniforms for rendering.
*/
export default function calcMidFreqAmplitude(
  data: Uint8Array,
  uniformsRef: React.RefObject<any>
) {
  let sum = 0;
  for (let i = 10; i < 16; i++) {
    sum += data[i];
  }
  // const average = sum / 7;
  const average = sum / 6; // <- just looks better.

  // Normalize the average amplitude:
  // Divide by 128 to map the range from 0 to 2 (128 is half of 255, the max freq value).
  // Math.min to cap the normalized value at 1.0, resulting in a range of 0 to 1.
  const normalizedValue = Math.min(average / 128, 1.0);
  // Calculate the difference between the current and new amplitude values, adding it back to the current uniform to update incrementally.
  // * 0.1 scales everything down to a range 0 - 0.1, making amp changes subtle
  uniformsRef.current.uAmplitude.value += (normalizedValue - uniformsRef.current.uAmplitude.value) * 0.1;
}