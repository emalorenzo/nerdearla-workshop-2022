import * as THREE from 'three'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, RoundedBox, Sky, useCursor, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Effects, MeshCurve, VideoPlane } from '@/components'
import { useState, useEffect, useRef } from 'react'

const CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 30, 60),
  new THREE.Vector3(20, 30, 45),
  new THREE.Vector3(30, 30, 0),
  new THREE.Vector3(20, 30, -45),
  new THREE.Vector3(0, 30, -60),
])

function Sphere() {
  const ref = useRef<THREE.Mesh>(null)
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(true)
  useCursor(active)
  // useFrame((state) => {
  //   if (ref.current) {
  //     ref.current.position.y = Math.sin(state.clock.getElapsedTime() / 2)
  //     state.camera.position.lerp({ x: 50, y: 25, z: zoom ? 50 : -50 }, 0.03)
  //     state.camera.lookAt(0, 0, 0)
  //   }
  // })
  return (
    <mesh ref={ref} receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
    </mesh>
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
      <hemisphereLight intensity={0.5} />
      <directionalLight position={[0, 2, 5]} castShadow intensity={0.5} />
      {/* <Sky /> */}
      <Environment preset='city' />
      <GizmoHelper
        alignment="bottom-right"
        margin={[100, 100]}
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      {/* <OrbitControls /> */}
      <MeshCurve points={cameraPositionPoints} />
      {/* building */}
      {/* ground */}
      {/* <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial envMapIntensity={0.5} roughness={0} metalness={0} />
      </mesh> */}
      <group position={[0, -3, 0]}>
        {/* ground */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[10, 10, 1, 64]} />
          <meshStandardMaterial color="black" envMapIntensity={0.5} roughness={0} metalness={0} />
        </mesh>
        {/* wall */}
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[17, 10, 1]} />
          <meshStandardMaterial color="black" envMapIntensity={0.5} roughness={0.8} metalness={0.2} />
        </mesh>
        <group position={[0, 0, 0]}>
          <RoundedBox receiveShadow castShadow smoothness={10} radius={0.015} position={[-7, 1, 1.6]} scale={[4.2, 2, 2]}>
            <meshStandardMaterial color="#f4ae00" envMapIntensity={0.5} roughness={0} metalness={0} />
          </RoundedBox>
          <mesh receiveShadow castShadow rotation-x={-Math.PI / 2} position={[8, 9.5, 1.1]} scale={[1, 1, 1]}>
            <boxGeometry args={[1, 1, 1, 3, 3, 3]} />
            <meshStandardMaterial color="#2d2d2d" envMapIntensity={0.5} roughness={0} metalness={0} wireframe />
          </mesh>
          {/* <Plane color="#d7dfff" rotation-x={-Math.PI / 2} position={[0, 4, 3]} scale={[2, 0.03, 4]} /> */}
        </group>
        <Sphere />
        <VideoPlane videourl='/nerdearla.mp4' />
        <VideoPlane videourl='/nerdearla.mp4' position={[0, 5, -0.51]} rotation-y={Math.PI} />
      </group>
      <Effects />
    </>
  )
}