const {User} = require('../src/db/sequelize')
const {Op} = require('sequelize')
const auth = require('../src/auth/authPrivateSrc')

module.exports = (app) => {
    app.get('/api/users',auth, (req, res) => {
        if(req.query.name){
            const name = req.query.name
            return User.findOne({
                where : {
                    username: name
                },
            })
            .then((user) => {
                if(user.length === 0){
                    const message = `${name} n'existe pas dans la base de donnéé`
                    res.status(404).json({message, error: error})
                }
                const message = `Voici les informations récupérées sur ${user.username}.`
                res.json({message, data: user})
            })
            .catch(error => {
                const message = `Une erreur c'est produite lors de la récupération des informations sur ${name}`
                res.status(404).json({message, error: error})
            })
        }
        else{
            User.findAll({order: ['username']})
            .then(user => {
                const message = `Voici les informations récupérer sur les utilisateurs.`
                res.json({message, data: user})
            })
            .catch( error => {
                const message = `Une erreur c'est produite lors de la récupération des informations sur les utilisateurs. Réessayer dans quelques instants`
                res.status(500).json({message, data : error})
            })
        } 
    }) 
}