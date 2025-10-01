import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../lib/typed-request-interface";
import { AddUserDTO, ConfirmUserDTO, UpdPsswdDTO } from "./auth.dto";
import atletaSerivice,  {
  UserExistsError,
} from "../atleta/atleta-service";
import { omit, pick } from "lodash";
import passport from "passport";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../lib/auth/jwt/jwt-strategy";

const TOKEN_DUR = "1 hour";

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, "username", "password");
    const UserUpd = {
      ...userData,
      dataApertura: new Date(),
    };
    const credentialsData = pick(req.body, "username", "password");

    const newUser = await atletaSerivice.addUser(UserUpd, credentialsData);
    await atletaSerivice.sendMail(credentialsData.username);

    res.status(201).json(newUser);
  } catch (err: any) {

    if (err instanceof UserExistsError) {
      res.status(400);
      res.json({
        error: err.name,
        message: err.message,
      });
    } else {
      next(err);
    }
  }
};

export const confirm = async (
  req: TypedRequest<ConfirmUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.username;

    await atletaSerivice.confirmEmail(email);

    res.status(201).json("Apertura Conto Corrente");
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "local",
      { session: false },
      async (err, user, info) => {
        if (err) {
          next(err);
          return;
        }
        if (!user) {
          res.status(400);
          res.json({
            error: "LoginError",
            message: info.message,
          });
          return;
        }
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_DUR });
        res.status(200);
        res.json({
          user,
          token,
        });
      }
    )(req, res, next);
  } catch (err: any) {
    next(err);
  }
};

export const updPssw = async (
  req: TypedRequest<UpdPsswdDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await atletaSerivice.updatePassword(req.user?.id!, oldPassword, newPassword);

    res.status(201).json("Password Aggiornata");
  } catch (err: any) {
    next(err);
  }
};
