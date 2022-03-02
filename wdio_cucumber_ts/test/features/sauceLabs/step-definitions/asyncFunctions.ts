module.exports = class AsFunc {
  async asyncFilterNamed(arr, predicate) {
    // https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
    const results = await Promise.all(arr.map(predicate));

    return arr.filter((_v, index) => results[index]);
  }
};
