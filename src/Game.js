import React, { Component, createRef } from 'react'
import * as THREE from 'three'

import setupRenderer from './rendering/setupRenderer'
import createCreature from './rendering/createCreature'
import createPond from './rendering/createPond'
import createPlayer from './rendering/createPlayer'

import flock, { MAX_SPEED } from './flock'

import './Game.css'

const worldWidth = 200
const worldHeight = 200

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.state = {
      score: 0,
    }

    this.player = {
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(0.2, 0.4, 0),
    }

    this.creatures = []
    for (var i = 0; i < 50; i++) {
      this.creatures.push({
        position: new THREE.Vector3(
          Math.random() * worldWidth - worldWidth / 2,
          Math.random() * worldHeight - worldHeight / 2,
          0,
        ),
        velocity: new THREE.Vector3(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, 0),
        creatureType: Math.floor(Math.random() * 4),
      })
    }
  }

  componentDidMount() {
    const { camera, scene, renderer } = setupRenderer(this.ref.current)

    const pondMesh = createPond(worldWidth, worldHeight)
    scene.add(pondMesh)

    const playerMesh = createPlayer()
    scene.add(playerMesh)

    const creatureMeshes = this.creatures.map(({ creatureType }) => createCreature(creatureType))

    creatureMeshes.forEach(creature => scene.add(creature))

    const animate = () => {
      this.creatures.forEach((creature, index) => {
        const neighbours = this.creatures.filter((creature, neighbourIndex) => neighbourIndex !== index)
        const { acceleration } = flock(creature, neighbours, this.player)
        creature.velocity.add(acceleration).clampScalar(-MAX_SPEED, MAX_SPEED)
        creature.position.add(creature.velocity)

        worldColision(creature)

        const angle = new THREE.Vector2(creature.velocity.x, creature.velocity.y).angle() + Math.PI

        const mesh = creatureMeshes[index]
        mesh.position.x = creature.position.x
        mesh.position.y = creature.position.y
        mesh.rotation.z = angle
      })

      const nearby = this.creatures.filter(creature => this.player.position.distanceTo(creature.position) < 20)

      if (nearby.length !== this.state.score) {
        this.setState({ score: nearby.length })
      }

      this.player.position.add(this.player.velocity)
      worldColision(this.player)

      camera.position.x = this.player.position.x
      camera.position.y = this.player.position.y

      playerMesh.position.x = this.player.position.x
      playerMesh.position.y = this.player.position.y

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }
    animate()
  }

  render() {
    return (
      <>
        <div className="score">
          {this.state.score} / {this.creatures.length}
        </div>
        <canvas id="game" ref={this.ref} />
      </>
    )
  }
}

function worldColision(entity) {
  if (entity.position.x < -worldWidth / 2 || entity.position.x > worldWidth / 2) {
    entity.velocity.x = -entity.velocity.x
  }

  if (entity.position.y < -worldWidth / 2 || entity.position.y > worldWidth / 2) {
    entity.velocity.y = -entity.velocity.y
  }
}
