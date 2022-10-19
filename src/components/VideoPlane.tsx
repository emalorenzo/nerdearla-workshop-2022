import { useEffect, useState } from "react"
import * as THREE from 'three'

export const VideoPlane = ({ videourl, ...props }) => {
  const [video] = useState(
    () => Object.assign(document.createElement('video'), { src: videourl, crossOrigin: 'Anonymous', loop: true, muted: true })
  )
  useEffect(() => {
    video.play()
  }, [video])
  return (
    <mesh position={[0, 5, 0.51]} rotation={[0, 0, 0]} scale={[17, 10, 1]} {...props}>
      <planeGeometry />
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </mesh>
  )
}