const transformPlugin = (schema) => {
  schema.set("toObject", {
    transform: (doc, ret) => {
      ret.id = ret._id;
      // transform the _id in ret.variations to id
      if (ret.variations) {
        ret.variations = ret.variations.map((variation) => {
          delete variation._id;
          // transform the _id in ret.variations.options to id
          variation.options = variation.options.map((option) => {
            option.id = option._id;
            delete option._id;
            return option;
          });
          return variation;
        });
      }
      delete ret._id;
      delete ret.__v;
    },
  });
};

module.exports = transformPlugin;
