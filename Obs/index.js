require ('dotenv').config()
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

const observacoesPorLembreteId = {}



app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4()
    const { texto } = req.body
    const obsDoLembrete = observacoesPorLembreteId[req.params.id] || []
    obsDoLembrete.push({id: idObs, texto})
    observacoesPorLembreteId[req.params.id] = obsDoLembrete
    res.status(201).send(obsDoLembrete)
})

const { MSS_OBSERVACOES_PORTA } = process.env
app.listen(
    MSS_OBSERVACOES_PORTA, 
    () => console.log(`Observacoes.PORT ${MSS_OBSERVACOES_PORTA}`)
)