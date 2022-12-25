const transformPlugin = (schema) => {
  schema.set('toObject', {
    transform: (doc, ret) => {
      delete ret.password;
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
};

module.exports = transformPlugin;
