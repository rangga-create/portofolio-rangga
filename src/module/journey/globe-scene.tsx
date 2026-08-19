import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { journeyPins, type JourneyPin } from './journey-data'
import PhotoGallery from './photo-gallery'

const ACCENT = '#FFC436'
const CREAM = '#EAE5DF'
const GLOBE_RADIUS = 2.1

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta))
}

function GlobeScene({ onSelect }: { onSelect?: (pin: JourneyPin, index: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoveredIndexRef = useRef<number | null>(null)
  const onSelectRef = useRef(onSelect)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  onSelectRef.current = onSelect

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 1.2, 6.5)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []

    // --- Globe: wireframe sphere + meridian rings ---
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48)
    const sphereWire = new THREE.MeshBasicMaterial({ color: CREAM, wireframe: true, transparent: true, opacity: 0.28 })
    const sphere = new THREE.Mesh(sphereGeo, sphereWire)
    globeGroup.add(sphere)

    const ringMat = new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.14 })
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(GLOBE_RADIUS * 1.02, 0.008, 8, 120)
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      ring.rotation.y = (i / 3) * Math.PI
      globeGroup.add(ring)
      geometries.push(ringGeo)
    }
    geometries.push(sphereGeo)
    materials.push(sphereWire, ringMat)

    // --- Pins ---
    const pinGeo = new THREE.SphereGeometry(0.085, 16, 16)
    const pinMat = new THREE.MeshStandardMaterial({
      color: ACCENT,
      emissive: ACCENT,
      emissiveIntensity: 1.2,
      roughness: 0.3
    })
    const haloGeo = new THREE.SphereGeometry(0.14, 16, 16)
    const haloMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18 })
    const pinMeshes: THREE.Mesh[] = []

    journeyPins.forEach((pin) => {
      const pos = latLngToVec3(pin.lat, pin.lng, GLOBE_RADIUS + 0.12)
      const halo = new THREE.Mesh(haloGeo, haloMat)
      halo.position.copy(pos)
      globeGroup.add(halo)
      const mesh = new THREE.Mesh(pinGeo, pinMat)
      mesh.position.copy(pos)
      mesh.userData = { index: pinMeshes.length }
      globeGroup.add(mesh)
      pinMeshes.push(mesh)
      geometries.push(pinGeo, haloGeo)
    })
    materials.push(pinMat, haloMat)

    // --- Journey arcs between pins ---
    const arcPositions = journeyPins.map((pin) => latLngToVec3(pin.lat, pin.lng, GLOBE_RADIUS + 0.05))
    const arcMat = new THREE.LineDashedMaterial({ color: ACCENT, transparent: true, opacity: 0.5, dashSize: 0.08, gapSize: 0.06 })
    for (let i = 0; i < arcPositions.length - 1; i++) {
      const from = arcPositions[i]
      const to = arcPositions[i + 1]
      const mid = from
        .clone()
        .add(to)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(GLOBE_RADIUS + 0.7)
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to)
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48))
      const line = new THREE.Line(curveGeo, arcMat)
      line.computeLineDistances()
      globeGroup.add(line)
      geometries.push(curveGeo)
    }
    materials.push(arcMat)

    // --- Stars ---
    const starCount = 500
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 30
      starPositions[i + 1] = (Math.random() - 0.5) * 30
      starPositions[i + 2] = (Math.random() - 0.5) * 30
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({ color: CREAM, size: 0.05, transparent: true, opacity: 0.6 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)
    geometries.push(starGeo)
    materials.push(starMat)

    scene.add(new THREE.AmbientLight('#ffffff', 0.7))
    const keyLight = new THREE.DirectionalLight(CREAM, 1.6)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)
    const accentLight = new THREE.PointLight(ACCENT, 1.2, 20)
    accentLight.position.set(-4, -2, 4)
    scene.add(accentLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.8
    controls.enablePan = false
    controls.minDistance = 4.5
    controls.maxDistance = 11

    // --- Raycasting (hover + click with drag guard) ---
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let dragStart: { x: number; y: number } | null = null

    const updatePointer = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const raycastPins = () => {
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pinMeshes, false)
      return hits.length > 0 ? (hits[0].object.userData.index as number) : null
    }

    const onMouseMove = (e: MouseEvent) => {
      updatePointer(e)
      const index = raycastPins()
      canvas.style.cursor = index !== null ? 'pointer' : 'grab'
      hoveredIndexRef.current = index
    }
    const onMouseDown = (e: MouseEvent) => {
      dragStart = { x: e.clientX, y: e.clientY }
    }
    const onMouseUp = (e: MouseEvent) => {
      updatePointer(e)
      if (dragStart) {
        const dx = e.clientX - dragStart.x
        const dy = e.clientY - dragStart.y
        if (Math.abs(dx) + Math.abs(dy) > 6) {
          dragStart = null
          return
        }
        dragStart = null
      }
      const index = raycastPins()
      if (index !== null) {
        setSelectedIndex(index)
        onSelectRef.current?.(journeyPins[index], index)
      }
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)

    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      globeGroup.rotation.y += 0.0008

      // gentle hover highlight: scale hovered pin
      pinMeshes.forEach((mesh, i) => {
        const target = i === hoveredIndexRef.current ? 1.9 : 1
        mesh.scale.setScalar(mesh.scale.x + (target - mesh.scale.x) * 0.15)
      })

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
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      resizeObserver.disconnect()
      controls.dispose()
      renderer.dispose()
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
    }
  }, [])

  const selectedPin = selectedIndex !== null ? journeyPins[selectedIndex] : null

  return (
    <div
      ref={containerRef}
      className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-secondary/20 bg-primary shadow-2xl md:h-[80vh]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-x-0 top-5 flex justify-center">
        <span className="rounded-full border border-secondary/30 bg-primary/60 px-4 py-1.5 font-poppins text-[10px] uppercase tracking-[0.3em] text-secondary/70 backdrop-blur-sm">
          drag to spin · click a pin
        </span>
      </div>

      {/* Detail card */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            key={selectedPin.city}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.79, 0.14, 0.15, 0.86] }}
            className="absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-secondary/20 bg-primary p-5 md:bottom-8 md:left-8 md:right-auto md:max-w-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-poppins text-[10px] uppercase tracking-[0.3em] text-yellow-300">
                  {selectedPin.emoji} {selectedPin.country}
                </p>
                <h3 className="mt-1 font-display text-2xl text-white md:text-3xl">{selectedPin.title}</h3>
                <p className="mt-1 font-poppins text-sm text-secondary/70 md:text-base">{selectedPin.text}</p>
                {selectedPin.photos?.length ? (
                  <div className="mt-4">
                    <p className="mb-2 font-poppins text-[10px] uppercase tracking-[0.3em] text-yellow-300/70">📷 Foto kegiatan</p>
                    <PhotoGallery photos={selectedPin.photos} title={selectedPin.title} accentColor={ACCENT} />
                  </div>
                ) : null}
              </div>
              <button
                onClick={() => setSelectedIndex(null)}
                aria-label="Close pin detail"
                className="rounded-full border border-white/20 px-2.5 py-1 font-poppins text-xs text-white/70 transition-colors hover:bg-white/10"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(GlobeScene)
