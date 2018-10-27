import React, { Component, createRef } from 'react'
import * as THREE from 'three'
import './Game.css'

import createLights from './createLights'
import createFish from './createFish'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ canvas: this.ref.current, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    function handleWindowResize() {
      const height = window.innerHeight
      const width = window.innerWidth
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleWindowResize, false)

    const fish = createFish()
    scene.add(fish)

    createLights().forEach(light => scene.add(light))

    camera.position.z = 5
    fish.rotation.x = 0.3
    fish.rotation.y = 1

    function animate() {
      fish.rotation.y -= 0.01
      // fish.rotation.x -= 0.01

      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
