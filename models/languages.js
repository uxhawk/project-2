module.exports = function(sequelize, DataTypes) {
  const Language = sequelize.define('language', {
    lang: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being
      // entered if it doesn't have a text value
      allowNull: false,
      // len is a validation that checks that our todo is
      // between 1 and 140 characters
      validate: {
        len: [1, 32],
      },
    },
    lang_code: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being
      // entered if it doesn't have a text value
      allowNull: false,
      // len is a validation that checks that our todo is
      // between 1 and 140 characters
      validate: {
        len: [2],
      },
    },
  },
  {
    freezeTableName: true,
  });

  return Language;
};
