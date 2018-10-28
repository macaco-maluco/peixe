import React, { Component, createRef } from 'react'

import setupRenderer from './rendering/setupRenderer'
import createFish from './rendering/createFish'
import createStingRay from './rendering/createStingRay'
import createPlayer from './rendering/createPlayer'
import createSiameseFish from './rendering/createSiameseFish'

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    const { camera, scene, renderer } = setupRenderer(this.ref.current)
    const { rotate, fish, player, stingRay, siameseFish } = this.props

    camera.position.z = 4

    const mesh = siameseFish
      ? createSiameseFish()
      : player
        ? createPlayer()
        : stingRay
          ? createStingRay()
          : createFish(fish)
    scene.add(mesh)

    function animate() {
      if (rotate) {
        mesh.rotation.y -= -0.01
      }

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
