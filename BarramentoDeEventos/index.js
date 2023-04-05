const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

// app.get('', (req, res) => {

// })

app.post('/eventos', (req, res) => {
    const evento = req.body

    // direcionando o evento para o mss de lembretes
    axios.post('http://localhost:4000/eventos', evento)

    // // direcionando o evento para o mss de observacoes
    axios.post('http://localhost:5000/eventos', evento)

    res.status(200).send({msg: 'ok'})

})

app.listen(1000, () => console.log("Barramento PORT 1000"))