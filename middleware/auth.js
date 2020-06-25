const jwt = require('jsonwebtoken');
const { User, Token} = require('../models');

const auth = async (req,res,next) => {
    try {
        //en req.headers estan los headers y guardamos el token en el de authorization
        const token = req.headers.authorization;
        //obtenemos el payload a partir del token y el secreto
        const payload = jwt.verify(token, 'SecretToken');
        //buscamos el id del usuario con findByPk(primarykey)
        const user = await User.findByPk(payload.id);

        //ahora buscamos el token en la base de datos, que no este revoked y pertenezca al usuario
        const tokenFound = await Token.findOne({
            where : { //condiciones
                token : token,
                UserId : payload.id,
                revoked : false
            }
        })
        //si el usuario o la busqueda del token no existen nos lanzara un error
        if(!user || !tokenFound) { 
            return res.status(401).send({ message : 'No estas autorizado'})
        }
        //queremos saber el usuario que haga algo y asi lo reconocemos
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({ message : 'No estas autorizado'})
    }
}
const isAdmin = (req, res, next) => {
    if (req.user.Role !== 'admin') {
        return res.status(403).send({
            message: 'You are not authorized.',
            
        })
    }
    next();
}
module.exports = auth, isAdmin;