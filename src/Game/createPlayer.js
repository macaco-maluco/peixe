import * as THREE from 'three'

export default function createPlayer() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}
