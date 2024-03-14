const jwt = require('jsonwebtoken')
const primaryKey = require('./private_key')
const {User} = require('../db/sequelize')
const admins = ['emko','gio']

module.exports= (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader){
        const message = "Vous n' avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête."
        return res.status(401).json({message})
    }
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token,primaryKey, (error, decodedToken) => {
        if(error){
            const message = "Votre token n'as pas pue être vérifier."
            return res.status(401).json({message, data: error})
        }
        User.findOne({
            where: {username: decodedToken.userName}
        })
        .then(user => {
            if(admins.includes(user.username)){
                next()
            }else{
                const message = "L'utilisateur n'est pas authorisé à accéder à cette ressource."
                return res.status(401).json({message, data: error})
            }
        })
    })
}