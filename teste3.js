import { fakeData as data } from "./fakeData";
import { AppError } from "./src/errors";

const deleteUsers = (req, res) => {
  const name = req.query.name;

  const userIndex = data.findIndex((user) => user.name.includes(name));
  if (userIndex == -1) {
    throw new AppError("User not found!", 404);
  }

  if (data[userIndex].id !== req.user.id) {
    throw new AppError("Unauthorized!", 401);
  }

  data.splice(userIndex, 1);
  return res.status(204).json({});
};

export default deleteUsers;
