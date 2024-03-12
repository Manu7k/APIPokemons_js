const {User} = require('../src/db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const primaryKey = require('../src/auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({
            where: {username: req.body.username}
        })
        .then(user => {
            if(!user){
                const message = "L'utilisateur demandé n'existe pas."
                return res.status(404).json({message})
            }
            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValid => {
                if(isPasswordValid){
                    const message = `Bienvenue ${user.username}`
                    const token = jwt.sign(
                        {userId: user.id},
                        primaryKey,
                        {expiresIn:'24h'}
                    )
                    return res.json({message, data: user, token})
                }
            
                else{
                    const message = 'Le mots de passe est incorrect.'
                    return res.status(404).json({message})
                }
            })
        })
        .catch(error => {
            const message = "Une erreur cc'est produite lors de la connection. Réessayez dans quelques instant."
            return res.json({message, data: error})
        })
    })
}