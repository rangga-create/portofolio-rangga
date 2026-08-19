import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ACCENT = '#FFC436'
const CREAM = '#EAE5DF'

function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const group = new THREE.Group()
    scene.add(group)

    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []

    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.5, 180, 24)
    const knotMat = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.25, metalness: 0.5 })
    const knot = new THREE.Mesh(knotGeo, knotMat)
    group.add(knot)

    const wireGeo = new THREE.TorusKnotGeometry(1.6, 0.5, 180, 24)
    const wireMat = new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.15 })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    group.add(wire)

    const ringGeo = new THREE.TorusGeometry(3, 0.02, 12, 160)
    const ringMat = new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.3 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.2
    group.add(ring)

    const sphereGeo = new THREE.SphereGeometry(0.16, 20, 20)
    const sphereMat = new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 0.6, roughness: 0.3 })
    const orbitGroup = new THREE.Group()
    const SPHERE_COUNT = 10
    for (let i = 0; i < SPHERE_COUNT; i++) {
      const sphere = new THREE.Mesh(sphereGeo, sphereMat)
      const angle = (i / SPHERE_COUNT) * Math.PI * 2
      sphere.position.set(Math.cos(angle) * 3.1, Math.sin(angle * 3) * 0.5, Math.sin(angle) * 3.1)
      orbitGroup.add(sphere)
    }
    group.add(orbitGroup)

    const starCount = 700
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40
      starPositions[i + 1] = (Math.random() - 0.5) * 40
      starPositions[i + 2] = (Math.random() - 0.5) * 40
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({ color: CREAM, size: 0.06, transparent: true, opacity: 0.7 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    geometries.push(knotGeo, wireGeo, ringGeo, sphereGeo, starGeo)
    materials.push(knotMat, wireMat, ringMat, sphereMat, starMat)

    scene.add(new THREE.AmbientLight('#ffffff', 0.6))
    const keyLight = new THREE.DirectionalLight(CREAM, 1.4)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)
    const accentLight = new THREE.PointLight(ACCENT, 1.4, 25)
    accentLight.position.set(-5, -2, 4)
    scene.add(accentLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.4
    controls.enablePan = false
    controls.minDistance = 5
    controls.maxDistance = 16

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)

      knot.rotation.x += 0.002
      knot.rotation.y += 0.005
      wire.rotation.x = knot.rotation.x
      wire.rotation.y = knot.rotation.y

      orbitGroup.rotation.y += 0.004
      ring.rotation.z += 0.0008

      group.rotation.y += (mouseX * 0.12 - group.rotation.y) * 0.02
      group.rotation.x += (mouseY * 0.08 - group.rotation.x) * 0.02

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
      controls.dispose()
      renderer.dispose()
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-secondary/20 bg-primary shadow-2xl md:h-[80vh]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 top-5 flex justify-center">
        <span className="rounded-full border border-secondary/30 bg-primary/60 px-4 py-1.5 font-poppins text-[10px] uppercase tracking-[0.3em] text-secondary/70 backdrop-blur-sm">
          drag to explore · auto-rotating
        </span>
      </div>
    </div>
  )
}

export default React.memo(ThreeScene)
