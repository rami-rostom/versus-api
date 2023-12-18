const tryCatch = (controller) => {
  return async (req, res, next) => {
    try {
      await controller (req, res, next);
    } 
    catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  };
};

module.exports = tryCatch;