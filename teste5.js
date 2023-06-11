import { fakeData as data } from "./fakeData";
import { AppError } from "./src/errors";

const getUserAccess = (req, res) => {
  var name = req.query.name;

  const userIndex = data.findIndex((user) => user.name.includes(name));
  if (userIndex == -1) {
    throw new AppError("User not found!", 404);
  }

  const readed = data[userIndex].readed;

  return res.send(`Usuário ${name} foi lido ${readed} vezes.`);
};

export default getUserAccess;
