const {Sequelize, DataTypes} =  require('sequelize')
const pokemonModel = require('../models/pokemon')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
let  pokemons  = require('./mockPokemon')

const sequelize = new Sequelize(
    'pokédex',
    'root',
    '',
    {
        host: 'localhost',
        dialect:'mariadb',
        dialectOptions : {
            timezone:'Etc/GMT-2'
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Impossible de se connecter à la base de données ${error}`))

const Pokemon = pokemonModel(sequelize, DataTypes)
const User = userModel(sequelize,DataTypes)
const initDb = () => {
    return sequelize.sync({force: true})
    .then(_ => {
        console.log('La base de données "Pokédex" a bien été synchronisée.')
        pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    types: pokemon.types
                }).then(pk => console.log(pk.toJSON()))
        })
        bcrypt.hash('emko',10)
        .then(hash => {
            User.create({
                username: 'emko',
                password: hash
            })
        })
        
    })
}
module.exports = {
    initDb, Pokemon, User
}