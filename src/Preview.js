import React, { Component, createRef } from 'react'

import setupRenderer from './rendering/setupRenderer'
import createFish from './rendering/createFish'
import createStingRay from './rendering/createStingRay'
import createPlayer from './rendering/createPlayer'

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    const { camera, scene, renderer } = setupRenderer(this.ref.current)

    camera.position.z = 4

    const mesh = this.props.player
      ? createPlayer()
      : this.props.stingRay
        ? createStingRay()
        : createFish(this.props.fish)
    scene.add(mesh)

    function animate() {
      mesh.rotation.y -= -0.01

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
