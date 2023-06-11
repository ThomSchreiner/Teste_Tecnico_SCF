import { fakeData as data } from "./fakeData";
import { AppError } from "./src/errors";
import { userSchema } from "./src/schemas/user.schemas";

const putUsers = (req, res) => {
  const id = req.query.id;

  if (id !== req.user.id) {
    throw new AppError("Unauthorized!", 401);
  }

  const userIndex = data.findIndex((user) => user.id == id);
  if (userIndex == -1) {
    throw new AppError("User not found!", 404);
  }

  const user = data[userIndex];
  user.name = req.body.name;
  user.job = req.body.job;
  data[userIndex] = user;

  const formatedUser = userSchema.parse(user);
  return res.json(formatedUser);
};

export default putUsers;
