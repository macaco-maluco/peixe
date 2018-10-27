import * as THREE from 'three'

const calculateOffset = ({ headLength, bodyLength }) => -(bodyLength + headLength) / 2

const fishes = [
  {
    headLength: 1,
    headColor: 0x271b74,
    bodyLength: 0.5,
    bodyColor: 0x271b74,
    tailLength: 0.4,
    tailColor: 0xffe700,
    flapLength: 0.3,
    flapColor: 0xffe700,
    eyeColor: 0x75253c,
  },
  {
    headLength: 0.5,
    headColor: 0xfb7813,
    bodyLength: 1.5,
    bodyColor: 0x833c54,
    tailLength: 0.45,
    tailColor: 0x4a2ee7,
    flapLength: 0.25,
    flapColor: 0x4a2ee7,
    eyeColor: 0x5c47a2,
  },
  {
    headLength: 1.0,
    headColor: 0xfb7813,
    bodyLength: 0,
    tailLength: 0.45,
    tailColor: 0x4a2ee7,
    flapLength: 0.25,
    flapColor: 0x4a2ee7,
    eyeColor: 0x5c47a2,
  },
]

export default function createFish() {
  const fish = fishes[2]

  const group = new THREE.Group()
  group.add(createHead(fish))
  if (fish.bodyLength > 0) {
    group.add(createBody(fish))
  }
  group.add(createTail(fish))
  group.add(createFlap(fish))
  group.add(createLeftEye(fish))
  group.add(createRightEye(fish))
  return group
}

function createHead(fish) {
  const geometry = new THREE.BoxGeometry(fish.headLength, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: fish.headColor,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = calculateOffset(fish)

  return mesh
}

function createBody(fish) {
  const geometry = new THREE.BoxGeometry(fish.bodyLength, 0.8, 0.8)
  const material = new THREE.MeshPhongMaterial({
    color: fish.bodyColor,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = fish.headLength / 2 + fish.bodyLength / 2 + calculateOffset(fish)

  return mesh
}

function createTail(fish) {
  const group = new THREE.Group()

  const baseGeometry = new THREE.BoxGeometry(fish.tailLength, fish.tailLength, fish.tailLength)
  const baseMaterial = new THREE.MeshPhongMaterial({
    color: fish.tailColor,
    shading: THREE.FlatShading,
  })

  const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial)
  group.add(baseMesh)

  const topGeometry = new THREE.BoxGeometry(3 * fish.tailLength, 0.5 * fish.tailLength, 0.05)
  const topMaterial = new THREE.MeshPhongMaterial({
    color: fish.tailColor,
    shading: THREE.FlatShading,
  })

  const topMesh = new THREE.Mesh(topGeometry, topMaterial)
  topMesh.rotation.z = -0.4
  group.add(topMesh)

  const bottomGeometry = new THREE.BoxGeometry(3 * fish.tailLength, 0.5 * fish.tailLength, 0.05)
  const bottomMaterial = new THREE.MeshPhongMaterial({
    color: fish.tailColor,
    shading: THREE.FlatShading,
  })

  const bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial)
  bottomMesh.rotation.z = 0.4
  group.add(bottomMesh)

  group.position.x = fish.bodyLength + fish.headLength / 2 + calculateOffset(fish)

  return group
}

function createFlap(fish) {
  const geometry = new THREE.BoxGeometry(fish.bodyLength * 0.2, fish.flapLength, 0.25)
  const material = new THREE.MeshPhongMaterial({
    color: fish.flapColor,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = fish.headLength / 2 + fish.bodyLength / 2 + calculateOffset(fish)
  mesh.position.y = -(0.8 / 2 + fish.flapLength / 2)

  return mesh
}

function createLeftEye(fish) {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: fish.eyeColor,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -(fish.headLength / 2 + 0.16 / 2) + calculateOffset(fish)
  mesh.position.y = 0.15
  mesh.position.z = 0.25

  return mesh
}

function createRightEye(fish) {
  const geometry = new THREE.BoxGeometry(0.1, 0.16, 0.16)
  const material = new THREE.MeshPhongMaterial({
    color: fish.eyeColor,
    shading: THREE.FlatShading,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = -(fish.headLength / 2 + 0.16 / 2) + calculateOffset(fish)
  mesh.position.y = 0.15
  mesh.position.z = -0.25

  return mesh
}
