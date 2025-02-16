export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uAmplitude;
  varying vec2 vUv;

  float curvedBar(vec2 uv, float amplitude, bool mirror) {
    // Parameters for the curve
    float width = 0.04;           // Width of the bar
    float curveAmount = 0.1;      // How much the bar curves outwards
    float spacing = 0.52;         // Space between the bars
    float baseAngle = 0.028;      // How much the base is pinched inward

    // Transform UV space to center the bar
    vec2 centered = vec2(uv.x - 0.5, uv.y);

    // Calculate base position with inward angle
    float baseOffset = (1.0 - uv.y) * baseAngle;

    // Adjust x position based on which bar we're drawing
    // Add the baseOffset to create the inward angle at the bottom
    centered.x += mirror ? (spacing - baseOffset) : (-spacing + baseOffset);

    // Calculate the curve
    // As y increases, x shifts based on a parabolic curve
    float curveOffset = pow(centered.y, 2.0) * curveAmount;
    // Mirror the curve direction for the right bar
    curveOffset *= mirror ? -1.0 : 1.0;
    float adjustedX = centered.x + curveOffset;

    // Bar shape
    float bar = smoothstep(width, width - 0.001, abs(adjustedX));

    // Cut off the bar based on amplitude, starting from bottom
    float heightCutoff = step(0.0, amplitude - uv.y);

    return bar * heightCutoff;
  }

  void main() {
    vec3 backgroundColor = vec3(0.07, 0.07, 0.07);
    vec3 barColor = vec3(1.0, 0.1, 0.3); // Reddish color

    // Create both bars
    float leftBar = curvedBar(vUv, uAmplitude, false);
    float rightBar = curvedBar(vUv, uAmplitude, true);
    float bars = max(leftBar, rightBar);

    // Subtle glow around edges
    float leftGlow = curvedBar(vUv, uAmplitude, false) * 0.5;
    float rightGlow = curvedBar(vUv, uAmplitude, true) * 0.5;
    float glow = max(leftGlow, rightGlow);

    // Set alpha to 0 where there are no bars or glow (so we can see the starfield behind the plane)
    float alpha = max(bars, glow);

    vec3 finalColor = mix(backgroundColor, barColor, bars + glow);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;