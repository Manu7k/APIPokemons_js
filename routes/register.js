const {User} =  require('../src/db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/register', (req, res) => {
        bcrypt.hash(req.body.password,10)
        .then(hash => {
            User.create({
                username: req.body.username,
                password: hash
            }).then( e => res.json({message:`votre enregistrement c'est terminer avec succès, bonne arrivée monsieur ${e.username}!`}))
            .catch(e => {
                res.status(404).json({message:e.message})
            })
        })
    })
}