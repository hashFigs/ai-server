import CustomContext from "../../../common/types/context";
import { IUserRegister } from "../../../common/types/user.types";
import UserModel, { IUser } from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../../utils/cryptTokens";


const UserController = {
    name: "user.controller",
    actions: {
      async register(ctx: CustomContext) {
        
        const {email, password, username }= ctx.params

        console.log("@@Params", email, password, username)
       
        if(!email || !password || !username) {
            throw new Error ("missing email or password")
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          email,
          username,
          password: hashedPassword,
        }) as IUser;
  
        await newUser.save();
  
        return { 
                message: "User registered successfully", 
                user: {
                  username: newUser.username,
                  email: newUser.email,
                 
                } 
            };
      },
      async login(ctx: CustomContext<{ email: string; password: string }>) {
        const { email, password } = ctx.params;
        console.log("params", email, password)
  
        const user = await UserModel.findOne({ email });
        
        if (!user) {
          throw new Error("User not found");
        }
  
        // Compare the password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid password");
        }
  
        const token = generateToken({ userId: user._id, email: user.email } ,  "1h" )
  
        return { message: "Login successful", token };
      },
      getProfile(ctx: CustomContext) {
        return ctx.call("user.service.getUserProfile", { userId: ctx.meta.userId });
      }
    }
  };
  
  export default UserController;