import React, { Component } from 'react'
import './App.css'
import Game from './Game'
import Preview from './Preview'

class App extends Component {
  render() {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('fish') ? <Preview fish={parseInt(searchParams.get('fish'), 10)} /> : <Game />
  }
}

export default App
