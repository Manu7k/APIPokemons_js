const { ValidationError, UniqueConstraintError } = require('sequelize')
const {Pokemon} = require('../src/db/sequelize')
const auth = require('../src/auth/authPublicSrc')
module.exports = (app) => {
    app.post('/api/pokemons', auth,(req, res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `Le pokemon ${pokemon.name} a bien été crée.`
            res.json({message, data: pokemon})
        })
        .catch( error => {
            if (error instanceof UniqueConstraintError){
                console.log({error: error.name})
                return res.status(400).json({message: `${error.message}`})
            }
            if(error instanceof ValidationError){
                console.log({error: error.name})
                return res.status(400).json({message: error.message})
            }
           
            const message = `Le  pokémons n'a pas pu être crée. Réessayer dans quelques instants`
            console.log({error: error.name})
            res.status(500).json({message})
        }) 
    })
   
}
