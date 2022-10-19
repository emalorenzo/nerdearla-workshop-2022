import { extend, useFrame } from '@react-three/fiber';
import { MeshLine, MeshLineMaterial } from 'meshline';
import { useRef } from 'react';
import type * as THREE from 'three';

extend({ MeshLine, MeshLineMaterial });

interface MeshCurveProps {
  points: THREE.Vector3[];
  color?: string;
  dashArray?: number;
  dashRatio?: number;
  lineWidth?: number;
  speed?: number;
}

export const MeshCurve: React.FC<MeshCurveProps> = ({
  points,
  dashArray,
  color,
  dashRatio,
  lineWidth,
  speed,
}) => {
  const line = useRef<MeshLine>();
  const material = useRef<MeshLineMaterial>();

  useFrame(() => {
    if (material.current && speed) {
      material.current.uniforms.dashOffset.value -= 0.0001 * speed;
    }
  });

  return (
    <mesh>
      {/* @ts-ignore */}
      <meshLine ref={line} attach="geometry" points={points} />
      {/* @ts-ignore */}
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest
        lineWidth={lineWidth}
        color={color}
        dashArray={dashArray}
        dashRatio={dashRatio}
      />
    </mesh>
  );
};

MeshCurve.defaultProps = {
  color: '#f00',
  dashArray: 0.05,
  dashRatio: 0.05,
  lineWidth: 0.1,
  speed: 0,
};
