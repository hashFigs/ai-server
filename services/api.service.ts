import { ServiceSchema } from "moleculer";
import ApiGateway from "moleculer-web";

const ApiService: ServiceSchema = {
  name: "api",
  mixins: [ApiGateway],
  settings: {
    routes: [
      {
        path: "/",
        aliases: {
          "POST /register": "user.register",
          "POST /login": "user.login",
          "POST /script/create": "scriptGenerator.service.create"
        }
      }
    ]
  }
};

export default ApiService;