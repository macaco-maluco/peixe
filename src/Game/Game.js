import React, { Component, createRef } from 'react'
import * as THREE from 'three'
import './Game.css'

import createLights from './createLights'
import createFish from './createFish'
import createPond from './createPond'
import createPlayer from './createPlayer'

import flock, { MAX_SPEED } from '../flock'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ canvas: this.ref.current, antialias: true })
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

    const pond = createPond()
    scene.add(pond)

    const playerMesh = createPlayer()
    scene.add(playerMesh)

    const player = {
      position: new THREE.Vector3(0, 0, 0),
    }

    const fishes = []
    for (var i = 0; i < 50; i++) {
      fishes.push({
        position: new THREE.Vector3(Math.random() * 40 - 20, Math.random() * 40 - 20, 0),
        velocity: new THREE.Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, 0),
        fishType: Math.floor(Math.random() * 3),
      })
    }

    const fishMeshes = fishes.map(({ fishType }) => createFish(fishType))

    fishMeshes.forEach(fish => scene.add(fish))

    function animate() {
      fishes.forEach((fish, index) => {
        const neighbours = fishes.filter((fish, neighbourIndex) => neighbourIndex !== index)
        const { acceleration } = flock(fish, neighbours, player)
        fish.velocity.add(acceleration).clampScalar(-MAX_SPEED, MAX_SPEED)
        fish.position.add(fish.velocity)

        const angle = new THREE.Vector2(fish.velocity.x, fish.velocity.y).angle() + Math.PI

        const mesh = fishMeshes[index]
        mesh.position.x = fish.position.x
        mesh.position.y = fish.position.y
        mesh.rotation.z = angle
      })

      camera.position.x = player.position.x
      camera.position.y = player.position.y

      playerMesh.position.x = player.position.x
      playerMesh.position.y = player.position.y

      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
