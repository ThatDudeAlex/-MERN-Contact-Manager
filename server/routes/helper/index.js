// wraps incoming functions inside an async function with try catch methods
const asyncHandler = (incomingFunction) => {
  return async (req, res) => {
    try {
      await incomingFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

