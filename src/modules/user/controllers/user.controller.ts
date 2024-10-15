import CustomContext from "../../../common/types/context";
import UserModel, { IUser } from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const UserController = {
    name: "user.controller",
    actions: {
      async register(ctx: CustomContext) {
        
        const {email, password }= ctx.params
        if(!email || !password) {
            throw new Error ("missing email or password")
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          email,
          password: hashedPassword,
        });
  
        await newUser.save();
  
        return { 
                message: "User registered successfully", 
                user: newUser 
            };
      },
      async login(ctx: CustomContext<{ email: string; password: string }>) {
        const { email, password } = ctx.params;
  
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
  
        // Compare the password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid password");
        }
  
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, "my_jwt_secret", { expiresIn: "1h" });
  
        return { message: "Login successful", token };
      },
      getProfile(ctx: CustomContext) {
        return ctx.call("user.service.getUserProfile", { userId: ctx.meta.userId });
      }
    }
  };
  
  export default UserController;