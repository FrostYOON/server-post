const test = (input) => {
  return (req, res, next) => {
    console.log(input, req.body, res.statusCode);
    next();
  };
};

export default test;
