// wraps incoming functions inside an async function with try catch methods
const asyncHandler = (incomingFunction) => {
  return async (req, res, next) => {
    try {
      await incomingFunction(req, res, next);
    } catch (error) {
      console.log(error)
    }
  };
};

module.exports = { asyncHandler }

