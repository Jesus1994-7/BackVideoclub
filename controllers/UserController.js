const { User,Token } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
    async getAllUsers(req,res){
        try {
            const users = await User.findAll()
            res.status(200).send(users);
        } catch (error) {
            console.log(error)
            req.status(500).send({ message : 'Hay un problema obteniendo los usuarios'});
        }
    },
    
    async signup(req,res) {
        try {
            const hash = await bcryptjs.hash(req.body.password, 9);
            req.body.password = hash;
            const user = await User.create(req.body)
            res.status(200).send(user)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Hay un problema creando el usuario'});
        }
    },
    async login(req,res) {
        try {
            const user = await User.findOne({
                where : {
                    email : req.body.email
                }
            });
            //Si el usuario esta mal introducido nos dirá que hay problemas con las credenciales
            if(!user){
                return res.status(400).send({ message : 'Problemas en las credenciales'})
            }
            //Comparamos la contraseña del body con la introducida y si es correcta, isMatch
            const isMatch = await bcryptjs.compare(req.body.password, user.password);
            //Si la contraseña no coincide nos dirá que hay problemas con las credenciales
            if(!isMatch){
                return res.status(400).send({ message : 'Problemas en las credenciales'})
            }
            const token = jwt.sign({id : user.id}, 'SecretToken')
            await Token.create({ token, UserId: user.id, revoked : false})

            res.send({
                user,
                token
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Hay un problema logeando el usuario'})
        }
    },
    async delete(req,res) {
        try {
            const { id } = req.params
            await User.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).send({ message : 'Usuario eliminado'})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Hay un problema logeando el usuario'})
        }
    }
    
}
module.exports = UserController;