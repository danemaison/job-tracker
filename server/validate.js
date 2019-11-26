const ApiError = require('./errors');

const validate = (req, res, next) => {
  const { body } = req;
  for (let key in body) {
    if (!String(body[key]).trim()) {
      return next(new ApiError(400, 'Invalid parameters'));
    }
  }
  next();
};

module.exports = validate;
