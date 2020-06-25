'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Order.belongsTo(models.Movie);

      //Order.belongsTo(models.User);
    }
  };
  Order.init({
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    RentalDay: DataTypes.DATE,
    ReturnDay: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};