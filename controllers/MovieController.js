const { Movie, Order } = require('../models');
const { Op } = require('sequelize');

const MovieController = {
    async getAllMovies(req,res) {
        try {
            const movies = await Movie.findAll()
            res.status(200).send(movies);
            
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error obteniendo usuarios'});
        }
    },
    async searchtitle(req,res) {
        try {
            const { title } = req.params
            const movie = await Movie.findOne({
                where : {
                    title : title
                }
            });
            if (movie === null){
                res.status(400).send({ message : 'Movie no encontrada'});
            }
            res.status(200).send(movie);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error creando pelicula'});
        }
    },
    async searchid(req,res) {
        try {
            const { id } = req.params;
            const movieId = await Movie.findOne({
                where : {
                    id : id
                }
            })
            if (movieId === null){
                res.status(400).send({ message : 'Movie no encontrada'});
            }
            res.status(200).send(movieId);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message : 'Error actualizando pelicula'});
        }
    },
    async mostPopular(req,res) {
        try {
            const popular = await Movie.findAll({
                where : {
                    popularity:{
                        [Op.gte] : 60
                    }
                }
            });
            res.status(200).send(popular)
        } catch (error) {
            res.status(500).send({ message : 'Error obteniendo peliculas populares'})
        }
    },
    async lastMovies(req,res) {
        try {
            const lastMovies = await Movie.findAll({
                where : {
                    release_date:{
                        [Op.between]: ['2018-01-01', '2020-06-27']
                    }
                }
            });
            res.status(200).send(lastMovies)
        } catch (error) {
            res.status(500).send({ message : 'Error buscando las ultimas peliculas'});
        }
    }
}
module.exports = MovieController;