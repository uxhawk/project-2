module.exports = function(sequelize, DataTypes) {
  const Vocab = sequelize.define('Vocab', {
    eng_phrase: {
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
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  return Vocab;
};
