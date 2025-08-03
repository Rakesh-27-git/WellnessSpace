// this is a middleware that will catch any errors and pass them to the next middleware

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      // use promiss
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
  };

export default asyncHandler;