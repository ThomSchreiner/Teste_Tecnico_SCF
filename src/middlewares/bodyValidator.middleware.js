export const bodyValidatorMiddleware = (schema) => (req, res, next) => {
  const body = schema.parse(req.body);
  req.body = body;

  return next();
};
