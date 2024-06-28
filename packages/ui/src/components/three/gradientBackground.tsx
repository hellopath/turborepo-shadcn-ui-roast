import { Suspense, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Preload, OrbitControls } from "@react-three/drei";
import { Center, Image as ImageImpl } from "@react-three/drei";
import * as THREE from 'three'
import { easing, geometry } from 'maath'

const GradientBackground = () => {

  extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

  return (
    <group>
      <mesh scale={4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export { GradientBackground }