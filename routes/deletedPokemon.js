const {Pokemon} = require('../src/db/sequelize')
const pokemon = require('../src/models/pokemon')
module.exports = (app) =>{
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if (pokemon === null) {
                const message = `Le pokémon  demandé n'existe pas. Réessayez avec un autre identifiant.`
                return res.status(404).json({message})
            }
            const pokemonDeleted = pokemon
            return Pokemon.destroy({
                where : {id : req.params.id}
            })
            .then(_ =>{
                const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`
                res.json({message, data: pokemonDeleted})
            })   
        })  
        .catch( error => {
            const message = `Le pokémon avec l'id n°${req.params.id} n'a pas pu être supprimé. Réessayer dans quelques instants`
            res.status(500).json({message, data : error})
        })
    })
}