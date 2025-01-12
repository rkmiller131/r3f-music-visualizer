export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uAmplitude;
  varying vec2 vUv;

  float curvedBar(vec2 uv, float amplitude, bool mirror) {
    // Parameters for the curve
    float width = 0.04;           // Width of the bar
    float curveAmount = 0.15;     // How much the bar curves
    float spacing = 0.52;         // Space between the bars

    // Transform UV space to center the bar
    vec2 centered = vec2(uv.x - 0.5, uv.y);

    // Adjust x position based on which bar we're drawing
    centered.x += mirror ? spacing : -spacing;

    // Calculate the curve
    // As y increases, x shifts based on a parabolic curve
    float curveOffset = pow(centered.y, 2.0) * curveAmount;
    // Mirror the curve direction for the right bar
    curveOffset *= mirror ? -1.0 : 1.0;
    float adjustedX = centered.x + curveOffset;

    // Create the bar shape
    float bar = smoothstep(width, width - 0.01, abs(adjustedX));

    // Cut off the bar based on amplitude, starting from bottom
    // float heightCutoff = step(0.0, amplitude - (1.0 - uv.y));
    float heightCutoff = step(0.0, amplitude - uv.y);

    return bar * heightCutoff;
  }

  void main() {
    vec3 backgroundColor = vec3(0.07, 0.07, 0.07);
    vec3 barColor = vec3(0.8, 0.3, 1.0);     // Purple color

    // Create both bars
    float leftBar = curvedBar(vUv, uAmplitude, false);
    float rightBar = curvedBar(vUv, uAmplitude, true);
    float bars = max(leftBar, rightBar);

    // Add subtle glow
    float leftGlow = curvedBar(vUv, uAmplitude, false) * 0.5;
    float rightGlow = curvedBar(vUv, uAmplitude, true) * 0.5;
    float glow = max(leftGlow, rightGlow);

    vec3 finalColor = mix(backgroundColor, barColor, bars + glow);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;