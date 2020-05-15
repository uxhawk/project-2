module.exports = function(sequelize, DataTypes) {
  const Vocab = sequelize.define('vocab', {
    orig_phrase: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being
      // entered if it doesn't have a text value
      allowNull: false,
      // len is a validation that checks that our todo is
      // between 1 and 140 characters
      validate: {
        len: [1, 256],
      },
    },
    translation: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being
      // entered if it doesn't have a text value
      allowNull: false,
      // len is a validation that checks that our todo is
      // between 1 and 140 characters
      validate: {
        len: [1, 256],
      },
    },
    word_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    character_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    freezeTableName: true,
  });

  Vocab.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an
    // Author due to the foreign key constraint
    Vocab.belongsTo(models.language, {
      foreignKey: 'from_id',
    });
    Vocab.belongsTo(models.language, {
      foreignKey: 'target_id',
    });
  };

  return Vocab;
};
