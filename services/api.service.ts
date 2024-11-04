import { ServiceSchema } from "moleculer";
import ApiGateway, { IncomingRequest, GatewayResponse } from "moleculer-web";
import CustomContext from "../src/common/types/context";
import {verifyToken} from "../src/utils/cryptTokens"


const ApiService: ServiceSchema = {
  name: "api",
  mixins: [ApiGateway],
  settings: {
    cors: {
      origin: ["http://localhost:4200", "http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: ["Authorization"],
      credentials: true,
      maxAge: 3600,
    },

  
    routes: [
      {
        path: "/",
        authorization: false,
        aliases: {
          "POST /register": "user.register",
          "POST /login": "user.login",
        },
      },
      {
        path: "/api",
        authorization: true,
        aliases: {
          "POST /script/create": "scriptGenerator.service.create",
          "POST /tone/create": "tone.service.create",
          "POST /youtube/create": "youtubeChannel.create",
          "POST /youtube/fetch-channel-data": "youtubeChannel.fetchChannelData",
        },
        onBeforeCall(ctx: CustomContext, route: any, req: IncomingRequest, res: GatewayResponse) {
          const authHeader = req.headers["authorization"];
          if (authHeader && authHeader.startsWith("Bearer ")) {
            ctx.meta.token = authHeader.slice(7);
          }
        },
      },
    ],
  },
  methods: {
    authorize(ctx:CustomContext, route:any, req:IncomingRequest) {
      const token = ctx.meta.token;

       if (!token) {
        throw new ApiGateway.Errors.UnAuthorizedError("NO_TOKEN", {
          message: "Authorization token is missing",
        });
      }
      try {
        const decoded = verifyToken(token)
         ctx.meta.userId = decoded.userId;  
      } catch (err) {
        throw new ApiGateway.Errors.UnAuthorizedError("INVALID_TOKEN", {
          message: "Invalid authorization token",
        });
      } 
    }
    },
};

export default ApiService;
