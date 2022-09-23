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

  // Category.associate = (models) => {
  //   Category.hasMany(models.PostCategory, {
  //     foreignKey: 'category_id', as: 'category'
  //   });
  // }
  
  return Category;
}