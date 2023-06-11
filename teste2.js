import { hashSync } from "bcryptjs";
import { fakeData as data } from "./fakeData";
import { v4 as uuid } from "uuid";
import { userSchema } from "./src/schemas/user.schemas";

const postUsers = (req, res) => {
  const newUser = {
    id: uuid(),
    ...req.body,
    password: hashSync(req.body.password, 10),
    readed: 0,
  };

  data.push(newUser);

  const formatedUser = userSchema.parse(newUser);
  return res.status(201).json(formatedUser);
};

export default postUsers;
