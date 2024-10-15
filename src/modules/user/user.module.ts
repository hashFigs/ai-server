import UserController from './controllers/user.controller';
import UserService from './services/user.service';
import { ServiceSchema } from "moleculer";


const UserModule: ServiceSchema = {
  name: "user",
  mixins: [UserController, UserService],
};

export default UserModule;