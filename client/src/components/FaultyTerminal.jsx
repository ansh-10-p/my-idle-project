import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TerminalShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#00ff00") },
    uResolution: { value: new THREE.Vector2(1000, 1000) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uVignette: { value: 0.5 },
    uScanlines: { value: 0.5 },
    uCurvature: { value: 0.1 },
    uGlitch: { value: 1.0 },
    uNoise: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uVignette;
    uniform float uScanlines;
    uniform float uCurvature;
    uniform float uGlitch;
    uniform float uNoise;
    varying vec2 vUv;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Retro Text / Matrix Effect
    float text(vec2 uv) {
        vec2 grid = vec2(100.0, 40.0); // Grid Size
        vec2 ipos = floor(uv * grid);
        float char = random(ipos + floor(uTime * 2.0)); // Flickering characters
        vec2 fpos = fract(uv * grid);
        float border = step(0.1, fpos.x) * step(0.1, fpos.y) * step(fpos.x, 0.9) * step(fpos.y, 0.9);
        return char * border;
    }

    // CRT Curvature
    vec2 curve(vec2 uv) {
        uv = (uv - 0.5) * 2.0;
        uv *= 1.1;	
        uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0) * uCurvature;
        uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0) * uCurvature;
        uv  = (uv / 2.0) + 0.5;
        uv =  uv *0.92 + 0.04;
        return uv;
    }

    void main() {
        vec2 uv = vUv;
        
        // 1. Apply Curvature
        uv = curve(uv);

        // Black out edges (outside CRT screen)
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
        }

        // 2. Glitch Offset
        float glitch = step(0.98, random(vec2(0.0, uTime * 0.5))) * uGlitch * 0.05;
        uv.x += glitch;

        // 3. Generate Matrix Text
        float txt = text(uv);

        // 4. Scanlines
        float scanline = sin(uv.y * uResolution.y * 0.5) * 0.1 * uScanlines;
        
        // 5. Vignette
        float vig = (0.0 + 1.0*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y));
        vig = pow(vig, uVignette);

        // 6. Combine
        vec3 color = uColor * txt;
        color += uNoise * random(uv * uTime) * 0.1; // Add noise
        color -= scanline;
        color *= vig;

        // Mouse interaction (Local brightening)
        float dist = distance(uv, uMouse);
        color += smoothstep(0.2, 0.0, dist) * 0.3;

        gl_FragColor = vec4(color, 1.0);
    }
  `
};

const ShaderPlane = ({ tint, scanlineIntensity, curvature, glitchAmount, noiseAmp, mouseReact }) => {
  const mesh = useRef();
  const material = useRef();

  // Create shader material once
  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(tint) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uVignette: { value: 0.3 },
        uScanlines: { value: scanlineIntensity },
        uCurvature: { value: curvature },
        uGlitch: { value: glitchAmount },
        uNoise: { value: noiseAmp },
      },
      vertexShader: TerminalShaderMaterial.vertexShader,
      fragmentShader: TerminalShaderMaterial.fragmentShader,
    }),
    [tint, scanlineIntensity, curvature, glitchAmount, noiseAmp]
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      if (mouseReact) {
        // Map mouse -1 to 1 => 0 to 1
        const mx = (state.mouse.x + 1) / 2;
        const my = (state.mouse.y + 1) / 2;
        // Lerp for smoothness
        material.current.uniforms.uMouse.value.lerp(new THREE.Vector2(mx, my), 0.1);
      }
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[20, 10]} /> {/* Large plane to cover screen */}
      <shaderMaterial ref={material} args={[shaderArgs]} transparent />
    </mesh>
  );
};

const FaultyTerminal = ({
  tint = "#00ff00",
  scanlineIntensity = 0.5,
  curvature = 0.1,
  glitchAmount = 1.0,
  noiseAmp = 0.5,
  mouseReact = true,
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ShaderPlane 
        tint={tint}
        scanlineIntensity={scanlineIntensity}
        curvature={curvature}
        glitchAmount={glitchAmount}
        noiseAmp={noiseAmp}
        mouseReact={mouseReact}
      />
    </Canvas>
  );
};

export default FaultyTerminal;