const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    res.send("<p>Hallo Welt</p>")
})

app.listen(PORT, () => {
    console.log('Server is running.')
})