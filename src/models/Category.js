module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true, 
    },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'categories',
  });

  return Category;
}