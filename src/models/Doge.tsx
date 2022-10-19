/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
        
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'


export const Doge = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/dogue/model.gltf')
    materials.body_orange = new THREE.MeshStandardMaterial({ color: '#cc7e47', envMapIntensity: 1, metalness: 0, roughness: 0.3 })
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Mesh001.geometry} material={materials.eyes} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh001_1.geometry} material={materials.eyes_pupile} />
      <mesh castShadow receiveShadow geometry={nodes.nose.geometry} material={materials.nose} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh002.geometry} material={materials['body_orange-light']} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh002_1.geometry} material={materials.body_orange} />
    </group>
  )
}

useGLTF.preload('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/dogue/model.gltf')