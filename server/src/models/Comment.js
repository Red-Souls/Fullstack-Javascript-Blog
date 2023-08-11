module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        username: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
    });

    Comment.associate = models => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: true,
                name: 'post',
            },
            onDelete: 'cascade',
        });
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'user',
            },
            onDelete: 'cascade',
        });
    }

    return Comment;
}