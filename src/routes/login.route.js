import { fakeData as data } from "../../fakeData";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcryptjs";
import "dotenv/config";
import { AppError } from "../errors";

export const postLogin = (req, res) => {
  const user = data.find(({ email }) => email == req.body.email);
  if (!user) {
    throw new AppError("User or password is invalid", 403);
  }

  const passwordMatch = compareSync(req.body.password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password is invalid", 403);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY, {
    subject: user.id,
    expiresIn: "24h",
  });

  return res.json({ token });
};
