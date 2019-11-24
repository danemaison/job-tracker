class ApiError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: err.message
    });
  }
  console.error(err);
  res.status(500).json({
    error: 'An unexpected error occured.'
  });
}

exports.ApiError = ApiError;

exports.errorHandler = errorHandler;
