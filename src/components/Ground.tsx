import { Reflector, useTexture } from "@react-three/drei"

export const Ground = () => {
  const [roughness, normal, alpha] = useTexture(['/ground_roughness.jpeg', '/ground_normals.jpeg', '/ground_alpha.jpg'])
  return (
    <Reflector blur={[400, 100]} castShadow receiveShadow resolution={512} args={[20, 20]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.1, 0]}>
      {/* @ts-ignore */}
      {(Material, props) => <Material color="#a0a0a0" metalness={0.8} roughness={0.15} alphaMap={alpha} normalScale={[2, 2]} envMapIntensity={0.1} {...props} />}
    </Reflector>
  )
}