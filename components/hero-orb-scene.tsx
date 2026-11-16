'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Particles({ count = 70 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 1.1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#dbeeff" transparent opacity={0.9} sizeAttenuation />
    </points>
  )
}

function Orb({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const lattice = useRef<THREE.LineSegments>(null)

  const latticeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 1)), [])

  useFrame((state, delta) => {
    if (!animate) return
    if (core.current) {
      core.current.rotation.y += delta * 0.4
      core.current.rotation.x += delta * 0.15
    }
    if (lattice.current) lattice.current.rotation.y -= delta * 0.08
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.2, 0.05)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.3, 0.05)
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshPhysicalMaterial
          color="#3b6fd6"
          transparent
          opacity={0.45}
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          emissive="#1b3f8f"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#5b8cff" emissive="#2f63e0" emissiveIntensity={0.8} flatShading />
      </mesh>
      <lineSegments ref={lattice} geometry={latticeGeo}>
        <lineBasicMaterial color="#6fb0ff" transparent opacity={0.45} />
      </lineSegments>
      <mesh rotation={[Math.PI / 2.3, 0.25, 0]}>
        <torusGeometry args={[2.35, 0.008, 8, 160]} />
        <meshBasicMaterial color="#cfe6ff" transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2, -0.45, 0.35]}>
        <torusGeometry args={[2.65, 0.006, 8, 160]} />
        <meshBasicMaterial color="#9fcbff" transparent opacity={0.5} />
      </mesh>
      <Particles />
    </group>
  )
}

export default function HeroOrbScene({ animate }: { animate: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={animate ? 'always' : 'demand'}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={40} color="#9cc8ff" />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#2f6bff" />
      <Orb animate={animate} />
    </Canvas>
  )
}
