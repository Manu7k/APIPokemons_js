const validTypes = ['Plante', 'Feu','Eau','Insecte','Vol','Normal','Electrik','Fée','Spectre','Poisson','Poison','Sol','Combat','Psy']
.toLocaleString()
.toLowerCase()
.split(',')
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg: 'Ce pokémon existe déjà'},
            validate: {
                notNull: {msg: 'Le nom est une proprieté requise.'},
                notEmpty: {msg: 'Le nom ne peut pas être vide.'},
                len: [2, 20]
            }
        },
        hp:{
            type : DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isInt: {msg:"Utilisez uniquement des nombres entiers pour les points de vie."},
              notNull: {msg:"Les points de vie sont une propriété requise."},
              max: {args:[100], msg:'Les point de vie doivent être inférieur ou égal à 100'},
              customValidator(value){
                if(this.hp >= 0){
                    this.hp = 10
                }
              }
            }
            
        },
        types:{
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
              },
             set(types) {
                this.setDataValue('types', types.join())
            }, 
            validate: {
                isTypesValid(value){
                    if(!value){
                        throw new Error("Un pokémon doit au moins avoir un type.")
                    }
                    if(value.split(',').length > 3){
                        throw new Error("Un pokémon ne peux pas avoir plus de trois types.")
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type.toLowerCase())){
                            throw new Error(`Le(s) type(s) de pokémon(s) doivent appartenir à la liste suivante : ${validTypes}`)
                            
                        }
                    })
                }
            }
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
   
}