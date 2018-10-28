import React, { Component, createRef } from 'react'

import setupRenderer from './rendering/setupRenderer'
import createFish from './rendering/createFish'

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    const { camera, scene, renderer } = setupRenderer(this.ref.current)

    camera.position.z = 4

    const fishMesh = createFish(this.props.fish)
    scene.add(fishMesh)

    console.log(fishMesh)

    function animate() {
      fishMesh.rotation.y -= -0.01

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
