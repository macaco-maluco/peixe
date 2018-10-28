import React, { Component } from 'react'
import './App.css'
import Game from './Game'
import Preview from './Preview'

class App extends Component {
  render() {
    const searchParams = new URLSearchParams(window.location.search)
    const hasPreview = searchParams.get('fish') || searchParams.get('stingRay') || searchParams.get('player')
    return hasPreview ? (
      <Preview
        fish={parseInt(searchParams.get('fish'), 10)}
        stingRay={!!searchParams.get('stingRay')}
        player={!!searchParams.get('fish') || searchParams.get('player')}
        rotate={searchParams.get('rotate') === 'true'}
      />
    ) : (
      <Game />
    )
  }
}

export default App
