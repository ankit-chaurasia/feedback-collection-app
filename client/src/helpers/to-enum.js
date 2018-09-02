import _ from 'lodash';

export default keys => {
  if (!_.isArray(keys)) return {};

  return _.reduce(
    keys,
    (accumulator, key) => {
      accumulator[key] = key;
      return accumulator;
    },
    {}
  );
};
