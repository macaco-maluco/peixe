import * as THREE from 'three'

export default function setupRenderer(canvas) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

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

  camera.position.z = 20

  createLights().forEach(light => scene.add(light))

  return { scene, camera, renderer }
}

function createLights() {
  // A hemisphere light is a gradient colored light;
  // the first parameter is the sky color, the second parameter is the ground color,
  // the third parameter is the intensity of the light
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  // A directional light shines from a specific direction.
  // It acts like the sun, that means that all the rays produced are parallel.
  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)

  // Set the direction of the light
  shadowLight.position.set(150, 350, 350)

  // Allow shadow casting
  shadowLight.castShadow = true

  // define the visible area of the projected shadow
  shadowLight.shadow.camera.left = -400
  shadowLight.shadow.camera.right = 400
  shadowLight.shadow.camera.top = 400
  shadowLight.shadow.camera.bottom = -400
  shadowLight.shadow.camera.near = 1
  shadowLight.shadow.camera.far = 1000

  // define the resolution of the shadow; the higher the better,
  // but also the more expensive and less performant
  shadowLight.shadow.mapSize.width = 2048
  shadowLight.shadow.mapSize.height = 2048

  const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

  return [hemisphereLight, shadowLight, ambientLight]
}
