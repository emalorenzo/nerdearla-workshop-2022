import { useEffect, useState } from "react"
import * as THREE from 'three'

export const VideoPlane = ({ videourl, ...props }: any) => {
  const [video] = useState(
    () => Object.assign(document.createElement('video'), { src: videourl, crossOrigin: 'Anonymous', loop: true, muted: true })
  )
  useEffect(() => {
    video.play()
  }, [video])
  return (
    <mesh castShadow receiveShadow position={[0, 5, 0.51]} rotation={[0, 0, 0]} scale={[16, 9, 1]} {...props}>
      <planeGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}