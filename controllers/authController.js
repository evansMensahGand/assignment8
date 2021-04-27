import User from "../models/User";
import httpErrors from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerValidator, loginValidator } from "../utils/validation";

export const register = async (req, res) => {
  //  check if all fields are available
  // if (!firstName||!lastName||!email||!password) {
  // res.status(httpErrors.BadRequest).json({message: "Please enter all fields"});
  // return;
  // }

  const result = await registerValidator.validateAsync(req.body);
  const { firstName, lastName, email, password } = result;

  // check if the email already exist in the database
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    res.status(httpErrors.BadRequest).json({ message: "Email aready exists" });
    return;
  }

  // hash the password

  const hashedPassword = await bcrypt.hash(password, 12);

  // create the user
  // const user = new User ({firstName, lastName,email, password});
  // user.profile ="http://localhost:4000/image.jpg"
  // const newUser = await user.save();

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ user });
};

export const login = async (req, res) => {
  // if (!email ||!password) {
  //   res.status(httpErrors.BadRequest)
  //   .json({message:"Please enter all fields"});
  //   return;
  // }

  const result = await loginValidator.validateAsync(reg.body);
  const { email, password } = result;

  let user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Invalid Credentials" });
    return;
  }
  //  check for password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }

  // generate token
  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "4h" });
  res.status(200).json({ token });
};

export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";
  token = token.split(" ")[1];

  if (token) {
    const decodedToken = jwt.verify(token, "123456789");
    req.user = decodedToken.id;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
