import {Request, Response} from 'express'
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";

import config from "../config/config";


function createToken(user: IUser) {
  return jwt.sign({ id: user.id, user: user.user }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signUp = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.body.user || !req.body.password) {
        return res
          .status(400)
          .json({ msg: "Please. Send your user and password" });
      }
    
      const user = await User.findOne({ user: req.body.user });
      if (user) {
        return res.status(400).json({ msg: "The User already Exists" });
      }
    
      const newUser = new User(req.body);
      await newUser.save();

      const data = {
        user: newUser.user,
        token: createToken(req.body.user)
      }
      return res.status(201).json(data);
}


export const signIn = async (req: Request, res:Response) => {
  if (!req.body.user || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your user and password" });
  }

  const user = await User.findOne({ user: req.body.user });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }

  return res.status(400).json({
    msg: "The user or password are incorrect"
  });
}