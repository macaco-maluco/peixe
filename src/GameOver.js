import React from 'react'

import './GameOver.css'

export default function GameOver() {
  return (
    <div className="gameOver">
      <h1>You have found all the fish!</h1>

      <p>
        Game built for the NodeKO 2018 hackathon by <a href="https://github.com/pirelenito/">pirelenito</a> and{' '}
        <a href="https://github.com/jucomin/">jucomin</a>{' '}
      </p>

      <a href="https://www.nodeknockout.com/entries/7-macaco-maluco/vote">➡ Vote for Us</a>
      <a href="/">➡ Restart</a>
    </div>
  )
}
