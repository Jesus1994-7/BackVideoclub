const { Order } = require('../models')

const OrderController = {
    create(req,res) {
        Order.create(req.body)

            .then(order => {
                               
                res.status(200).send(order)
            })
            .catch( error => {
                console.log(error)
                res.status(500).send({ message : 'Ha habido un problema creando el pedido'})
            })
    },
    getAllOrders(req,res) {
        Order.findAll()

            .then(order => {
                res.status(200).send(order);
            })

            .catch(error => {
                console.log(error)
                res.status(500).send({ message : 'Problemas obteniendo los pedidos'})
            })
    },
    getOneOrder(req,res) {
        const { id } = req.params
        Order.findOne({
            where : {
                id : id
            }
        })
        .then(order => {
            res.status(200).send(order)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ message : 'Error obteniendo el pedido'})
        })
    },
    update(req,res) {
        const { id } = req.params
        Order.update(req.body, {
            where : {
                id : id
            }
        })
        .then(() => res.send({message : 'Pedido actualizado correctamente'}))
        .catch(error => {
            console.log(error)
            res.status(500).send({ message : 'Error actualizando el pedido'})
        })
    },
    delete(req,res){
        const { id } = req.params
        Order.destroy({
            where : {
                id : id
            }
        })
            .then(() => res.send({ message: 'Pedido eliminado correctamente' }))
            .catch(error => {
                console.error(error)
                res.status(500).send({ message: 'Hay un problema intentando eliminar el pedido' });
            })
    }
}

module.exports = OrderController;