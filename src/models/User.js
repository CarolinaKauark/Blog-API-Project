module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true, 
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, 
  {
    timestamps: false,
    underscored: true,
    tableName: 'users',
  });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPost, {
  //     foreignKey: 'user_id', as: 'user'
  //   });
  // }

  return User;
}