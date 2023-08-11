module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: 'user',
            },
            onDelete: 'cascade',
        });
        Post.hasOne(models.Comment);
    }

    return Post;
}