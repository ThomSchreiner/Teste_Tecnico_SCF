import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import teste1 from "./teste1";
import teste2 from "./teste2";
import teste3 from "./teste3";
import teste4 from "./teste4";
import teste5 from "./teste5";
import { handleError } from "./src/errors";
import { bodyValidatorMiddleware } from "./src/middlewares/bodyValidator.middleware";
import { createUserSchema } from "./src/schemas/user.schemas";
import { postLogin } from "./src/routes/login.route";
import { loginSchema } from "./src/schemas/login.schemas";
import { verifyTokenMiddleware } from "./src/middlewares/verifyToken.middleware";

const app = express();

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.post("/login", bodyValidatorMiddleware(loginSchema), postLogin);
app.get("/user", teste1.getUser);
app.get("/users", teste1.getUsers);
app.post("/users", bodyValidatorMiddleware(createUserSchema), teste2);
app.delete("/users", verifyTokenMiddleware, teste3);
app.put("/users", verifyTokenMiddleware, bodyValidatorMiddleware(createUserSchema), teste4);
app.get("/users/access", teste5);

app.use(handleError);

const port = 3000;
app.listen(port, () => {
  console.log("Express server listening on port " + port);
});
