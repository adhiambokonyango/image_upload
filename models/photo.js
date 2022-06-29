const {
  DataTypes
} = require('sequelize');

const con = require("../common")


module.exports = sequelize => {
  const attributes = {
    PhotoID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "PhotoID"
    },
    Photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Photo"
    }
  };
  const options = {
    tableName: "photo",
    comment: "",
    indexes: [],
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
  };
  const PhotoModel = con.define("photo_model", attributes, options);
  return PhotoModel;
};