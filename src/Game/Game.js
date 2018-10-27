import React, { Component, createRef } from 'react'
import * as THREE from 'three'
import './Game.css'

import createLights from './createLights'

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

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.6,
      shading: THREE.FlatShading,
    })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    createLights().forEach(light => scene.add(light))

    camera.position.z = 5

    function animate() {
      cube.rotation.y -= 0.01
      cube.rotation.x -= 0.01

      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
