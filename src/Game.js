import React, { Component, createRef } from 'react'
import * as THREE from 'three'

import setupRenderer from './rendering/setupRenderer'
import createCreature from './rendering/createCreature'
import createPond from './rendering/createPond'
import createPlayer from './rendering/createPlayer'

import flock, { MAX_SPEED } from './flock'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    const { camera, scene, renderer } = setupRenderer(this.ref.current)

    const worldWidth = 200
    const worldHeight = 200

    const pondMesh = createPond(worldWidth, worldHeight)
    scene.add(pondMesh)

    const playerMesh = createPlayer()
    scene.add(playerMesh)

    const player = {
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0.01, 0.01, 0),
    }

    const creatures = []
    for (var i = 0; i < 50; i++) {
      creatures.push({
        position: new THREE.Vector3(
          Math.random() * worldWidth - worldWidth / 2,
          Math.random() * worldHeight - worldHeight / 2,
          0,
        ),
        velocity: new THREE.Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, 0),
        creatureType: Math.floor(Math.random() * 4),
      })
    }

    const creatureMeshes = creatures.map(({ creatureType }) => createCreature(creatureType))

    creatureMeshes.forEach(creature => scene.add(creature))

    function animate() {
      creatures.forEach((creature, index) => {
        const neighbours = creatures.filter((creature, neighbourIndex) => neighbourIndex !== index)
        const { acceleration } = flock(creature, neighbours, player)
        creature.velocity.add(acceleration).clampScalar(-MAX_SPEED, MAX_SPEED)
        creature.position.add(creature.velocity)

        if (creature.position.x < -worldWidth / 2) {
          creature.velocity.x = MAX_SPEED
          creature.velocity.y = 0
        }

        if (creature.position.x > worldWidth / 2) {
          creature.velocity.x = -MAX_SPEED
          creature.velocity.y = 0
        }

        if (creature.position.y < -worldWidth / 2) {
          creature.velocity.x = 0
          creature.velocity.y = MAX_SPEED
        }

        if (creature.position.y > worldWidth / 2) {
          creature.velocity.x = 0
          creature.velocity.y = -MAX_SPEED
        }

        const angle = new THREE.Vector2(creature.velocity.x, creature.velocity.y).angle() + Math.PI

        const mesh = creatureMeshes[index]
        mesh.position.x = creature.position.x
        mesh.position.y = creature.position.y
        mesh.rotation.z = angle
      })

      player.position.add(player.velocity)

      camera.position.x = player.position.x
      camera.position.y = player.position.y

      playerMesh.position.x = player.position.x
      playerMesh.position.y = player.position.y

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }
    animate()
  }

  render() {
    return <canvas id="game" ref={this.ref} />
  }
}
