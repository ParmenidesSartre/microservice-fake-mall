const transformArray = (docs) => {
  const transformedArray = [];
  docs.forEach((doc) => {
    const transformedDoc = doc.toObject();
    transformedArray.push(transformedDoc);
  });
  return transformedArray;
};

module.exports = transformArray;
