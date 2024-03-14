const { ValidationError } = require('sequelize')
const {Pokemon} = require('../src/db/sequelize')
const pokemon = require('../src/models/pokemon')
const auth = require('../src/auth/authPublicSrc')
module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, { 
            where: {id :id}
        }).then(_ => {
            return Pokemon.findByPk(id).then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokémon  demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({message})
                }
                const message = `Le pokemon ${pokemon.name} a bien été modifié.`
                res.json({message, data: pokemon})
            })  
        })
        .catch( error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            }
            const message = `Le  pokémons n'a pas pu être modifié. Réessayer dans quelques instants`
            res.status(500).json({message, data : error})
            typeof(error)
        }) 
    })
   
}