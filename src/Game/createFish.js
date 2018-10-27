import * as THREE from 'three'

export default function createFish() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.6,
    shading: THREE.FlatShading,
  })

  const cube = new THREE.Mesh(geometry, material)

  return cube
}
