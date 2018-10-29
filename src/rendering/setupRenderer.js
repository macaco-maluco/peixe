import * as THREE from 'three'

export default function setupRenderer(canvas) {
  const scene = new THREE.Scene()
  const aspect = window.innerWidth / window.innerHeight
  const frustumSize = 40
  const camera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    1,
    2000,
  )

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  function handleWindowResize() {
    const height = window.innerHeight
    const width = window.innerWidth
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  window.addEventListener('resize', handleWindowResize, false)

  camera.rotation.x = Math.PI / 4
  camera.position.z = 60

  createLights().forEach(light => scene.add(light))

  return { scene, camera, renderer }
}

function createLights() {
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
  shadowLight.position.set(150, 350, 350)

  const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

  return [hemisphereLight, shadowLight, ambientLight]
}
