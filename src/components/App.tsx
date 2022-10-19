import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { Leva } from 'leva'
import { HomeScene } from '@/scenes'
import { ScrollControls, Stats } from '@react-three/drei'

export const App = () => {
  const dom = useRef<HTMLElement>(null)
  return (
    <>
      <main className="app" ref={dom}>
        <section className='hero'>
          <h1>Web 3D Workshop</h1>
          <h3>Por Emanuel Lorenzo - @emalorenzo_</h3>
        </section>
      </main>
      <Canvas
        //@ts-ignore 
        // eventSource={dom}
        className='canvas'
        shadows
        gl={{ logarithmicDepthBuffer: true, antialias: false, stencil: false, depth: true }}
        // camera={{ position: [250, 225, 250], fov: 15 }}
        camera={{ position: [0, 30, 60], fov: 15 }}
      >
        <ScrollControls distance={5} enabled damping={1}>
          <HomeScene />
        </ScrollControls>
      </Canvas>
      <Leva titleBar={{ title: 'SSR' }} collapsed />
      <Stats />
    </>
  )
}
