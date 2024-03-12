const {Pokemon} = require('../src/db/sequelize')
module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if (pokemon === null) {
                const message = `Le pokémon  demandé n'existe pas. Réessayez avec un autre identifiant.`
                return res.status(404).json({message})
            }
            const message = `Le pokémon a bien été récupérée.`
            res.json({message, data: pokemon})
        })   
        .catch(error => {
            const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques instants`
            res.status(500).json({message, data: error })
        }) 
    })
    
}
   