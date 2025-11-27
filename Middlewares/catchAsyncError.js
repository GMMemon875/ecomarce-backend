import { promises } from "nodemailer/lib/xoauth2";

export const catchAsyncErrors = async (theFuntion) => {
  return async (req, res, next) => {
    promises.resolve(theFuntion(req, res, next)).catch(next);
  };
};
