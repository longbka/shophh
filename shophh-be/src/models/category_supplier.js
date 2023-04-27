'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Category_Supplier.init({
    categoryId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category_Supplier',
  });
  return Category_Supplier;
};