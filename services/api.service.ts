import { ServiceSchema } from "moleculer";
import ApiGateway from "moleculer-web";

const ApiService: ServiceSchema = {
  name: "api",
  mixins: [ApiGateway],
  settings: {
    cors: {
      origin: ["http://localhost:4200", , "http://localhost:5173"], 
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: ["Authorization"],
      credentials: true, 
      maxAge: 3600 
    },
    routes: [
      {
        path: "/",
        aliases: {
          "POST /register": "user.register",
          "POST /login": "user.login",
          "POST /script/create": "scriptGenerator.service.create",
          "POST /tone/create": "tone.service.create",

        }
      }
    ]
  }
};

export default ApiService;