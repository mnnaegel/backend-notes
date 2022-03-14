const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${Date.now()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.sendStatus(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const p = persons.find(person => person.id === id)

    if (p) {
        persons = persons.filter(person => person.id !== id)
        res.sendStatus(204).end()
    } 
})

const generateId = () => {
    return Math.floor(Math.random() * 5)
}

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.age) {
        return res.status(404).send(`Missing age or name`)
    }

    const newPerson = {
        'age': req.body.age,
        'name': req.body.name,
        'id': generateId(),
    }

    if (persons.find(person=>newPerson.id === person.id)) {
        return res.status(404).send(`Already exists bro`)
    }

    console.log(newPerson)
    persons = persons.concat(newPerson)
    res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})