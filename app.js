const express = require('express')
//const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon =  require('serve-favicon')
const sequelize = require('./src/db/sequelize')




const app = express()
const port =  3000

app
    //.use(morgan('dev'))
    .use(favicon(__dirname + '/favicon.svg'))
    .use(bodyParser.json())
    

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
sequelize.initDb()

require('./routes/findAllPokemons')(app)
require('./routes/findPokemonsByPk')(app)
require('./routes/createPokemon')(app)
require('./routes/updatePokemon')(app)
require('./routes/deletedPokemon')(app)
require('./routes/login')(app)
require('./routes/register')(app)
require('./routes/findAllUsers')(app)

app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})