// src/modules/user/services/user.service.ts
import { ServiceSchema } from "moleculer";
import UserModel from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserService: ServiceSchema = {
  name: "user.service",

};

export default UserService;

