import * as THREE from 'three'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, RoundedBox, Sky, Stars, useCursor, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Effects, Ground, MeshCurve, VideoPlane } from '@/components'
import { useState, useEffect, useRef, Suspense } from 'react'
import { Doge } from '@/models'

const CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 30, 60),
  new THREE.Vector3(0, 30, 80),
  new THREE.Vector3(60, 30, 45),
  new THREE.Vector3(80, 30, 0),
  new THREE.Vector3(60, 30, -45),
  new THREE.Vector3(0, 30, -80),
  new THREE.Vector3(0, 30, -60),
])

function Sphere() {
  const ref = useRef<THREE.Mesh>(null)
  return (
    <mesh ref={ref} receiveShadow castShadow position={[-3, 0.55, -3]}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
    </mesh>
  )
}

const BackgroundBoxes = () => {
  return (
    <>
      {/* <mesh position={[-15, 5, -15]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="hotpink" />
      </mesh> */}
    </>
  )
}

export const HomeScene = () => {
  const scroll = useScroll();
  const cameraPositionPoints = CURVE.getPoints(200)

  useFrame(({ camera }) => {
    const positionPoint = CURVE.getPoint(scroll.offset);

    camera.position.set(positionPoint.x, positionPoint.y, positionPoint.z);
    camera.lookAt(0, 0, 0);
  })

  return (
    <>
      <color attach="background" args={['#151520']} />
      <pointLight position={[10, 15, 15]} color="#570c0c" castShadow intensity={5} shadow-camera-near={0.1}
        shadow-camera-far={200}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024} />
      <directionalLight position={[10, 15, -5]} color="#570c0c" castShadow intensity={5} shadow-camera-near={0.1}
        shadow-camera-far={200}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024} />
      <Environment preset='city' />
      <GizmoHelper
        alignment="bottom-right"
        margin={[100, 100]}
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      {/* <OrbitControls /> */}
      {/* <MeshCurve points={cameraPositionPoints} /> */}
      {/* building */}
      {/* ground */}
      {/* <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial envMapIntensity={0.5} roughness={0} metalness={0} />
      </mesh> */}
      <group position={[0, -3, 0]}>
        {/* ground */}
        <mesh position={[0, -5, 0]}>
          <cylinderGeometry args={[10, 10, 10, 64]} />
          <meshStandardMaterial color="black" envMapIntensity={0.5} roughness={0} metalness={0} />
        </mesh>
        {/* wall */}
        <mesh castShadow receiveShadow position={[0, 5, 0]}>
          <boxGeometry args={[17, 10, 1]} />
          <meshStandardMaterial color="black" envMapIntensity={0.5} roughness={0.2} metalness={0.8} />
        </mesh>
        <group position={[0, 0, 0]}>
          <RoundedBox receiveShadow castShadow smoothness={10} radius={0.015} position={[-7, 1, 1.6]} scale={[4.2, 2, 2]}>
            <meshStandardMaterial color="#f4ae00" envMapIntensity={0.5} roughness={0} metalness={0} />
          </RoundedBox>
          <mesh position={[5, 1, 5]} castShadow>
            <icosahedronGeometry />
            <meshStandardMaterial color="#8e00f4" envMapIntensity={0.5} roughness={0} metalness={0} />
          </mesh>
          <mesh receiveShadow castShadow rotation-x={-Math.PI / 2} position={[8, 1.1, 2]} scale={[2, 2, 2]}>
            <boxGeometry args={[1, 1, 1, 3, 3, 3]} />
            <meshStandardMaterial color="#2d2d2d" envMapIntensity={0.5} roughness={0} metalness={0} wireframe />
          </mesh>
        </group>
        <Sphere />
        <Ground />
        <VideoPlane videourl='/nerdearla.mp4' />
        <VideoPlane videourl='/nerdearla.mp4' position={[0, 5, -0.51]} rotation-y={Math.PI} />
        <BackgroundBoxes />
      </group>
      <Stars radius={50} depth={50} count={5000} factor={20} saturation={0} fade speed={1} />
      <Suspense>
        <Doge position={[4, -2.8, -3]} rotation-y={Math.PI / 0.31} scale={1.5} />
      </Suspense>
      <Effects />
    </>
  )
}