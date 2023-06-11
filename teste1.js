import { fakeData as data } from "./fakeData";
import { AppError } from "./src/errors";
import { userListSchema, userSchema } from "./src/schemas/user.schemas";

const getUser = (req, res) => {
  const name = req.query.name;

  const userIndex = data.findIndex((user) => user.name.includes(name));
  if (userIndex == -1) {
    throw new AppError("User not found!", 404);
  }

  data[userIndex].readed += 1;

  const formatedUser = userSchema.parse(data[userIndex]);
  return res.json(formatedUser);
};

const getUsers = (req, res) => {
  data.forEach((user, i) => (data[i].readed += 1));

  const formatedUsers = userListSchema.parse(data);
  return res.json(formatedUsers);
};

export default {
  getUser,
  getUsers,
};
