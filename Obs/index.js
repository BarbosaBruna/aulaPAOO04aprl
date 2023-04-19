require ('dotenv').config()
const express = require('express')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

const observacoesPorLembreteId = {}



app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || [])
})

app.post('/lembretes/:id/observacoes', async (req, res) => {
    // gera um id de observacoes
    const idObs = uuidv4()
    // pega a obs
    const { texto } = req.body
    const obsDoLembrete = observacoesPorLembreteId[req.params.id] || []
    obsDoLembrete.push({id: idObs, texto})
    observacoesPorLembreteId[req.params.id] = obsDoLembrete
    await axios.post(
        'https://localhost:10000/eventos',
        {
            tipo: 'ObsCriada',
            dados: {
                id: idObs, texto, lembreteId: req.params.id
            }
        }
    )
    res.status(201).send(obsDoLembrete)
})

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).send({msg: 'ok'})
})

const { MSS_OBSERVACOES_PORTA } = process.env
app.listen(
    MSS_OBSERVACOES_PORTA, 
    () => console.log(`Observacoes.PORT ${MSS_OBSERVACOES_PORTA}`)
)