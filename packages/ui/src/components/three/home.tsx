import { Suspense, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Preload, OrbitControls } from "@react-three/drei";
import { Center, Image as ImageImpl } from "@react-three/drei";
import * as THREE from 'three'
import { easing, geometry } from 'maath'
import { GradientBackground } from "./gradientBackground";

const HomeThree = () => {

  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

  return (
    <Canvas
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      dpr={[1, 2]}
      camera={{ fov: 45, position: [0, 0, 9] }}
    >
      {/* <Lights /> */}
      <GradientBackground />
      <Suspense fallback={null}>
        <group>
          <ImageImpl
            url={`/homeImage1.png`}
            position={[0.5, -0.2, 0]}
            rotation-z={Math.PI * -0.02}
            scale={0.4}
            transparent
          >
            <roundedPlaneGeometry args={[4, 4.5, 0.3]} />
          </ImageImpl>
        </group>
        <group>
          <ImageImpl
            url={`/homeImage2.png`}
            position={[-0.4, 1, -0.1]}
            rotation-z={Math.PI * 0.01}
            scale={0.5}
            transparent
          >
            <roundedPlaneGeometry args={[4, 4.5, 0.3]} />
          </ImageImpl>
        </group>
        <Preload />
      </Suspense>
      <OrbitControls
        dampingFactor={0.08}
        zoomSpeed={0.5}
        enableZoom={true}
        makeDefault
      />
    </Canvas>
  )
}

export { HomeThree }