module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true, 
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.Date, 
  }, 
  {
    timestamps: false,
    underscored: true,
    tableName: 'blog_posts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'user_id', as: 'user'
    });
  }

  return BlogPost;
}