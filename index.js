const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.use(express.static('build'))

app.listen(port, () => console.log(`Server listening on port ${port}!`))
