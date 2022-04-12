import express from 'express';
import Joi from 'joi';
import { ErrorStatus } from '../types/global';
import ApiError from '../utils/ApiError';

const schemas: Record<string, Joi.ObjectSchema> = {
  'POST /user': Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(64).required(), // 64 characters for SHA256 pre-encrypted password
    firstName: Joi.string().required(),
  }),
};

const validateReq = async (
  req: express.Request<any, any, any, any>,
  res: express.Response,
  next: express.NextFunction,
) => {
  let reqPath = `${req.method} ${req.baseUrl}${req.route.path}`;
  if (reqPath.endsWith('/')) reqPath = reqPath.slice(0, -1);

  if (!Object.prototype.hasOwnProperty.call(schemas, reqPath)) {
    return next();
  }

  const schema: Joi.ObjectSchema = schemas[reqPath];

  let toValidate = req.body;
  if (req.method === 'GET') toValidate = req.query;
  const { error } = schema.validate(toValidate);
  if (error) {
    return next(new ApiError('validation_error', ErrorStatus.BadRequest, error));
  }

  return next();
};

export default validateReq;
