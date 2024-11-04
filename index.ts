import { ServiceBroker } from "moleculer";

import ApiService from "./services/api.service"; 
import MongooseService from "./src/modules/mongoodb/services/mongoose.service";
import UserModule from "./src/modules/user/user.module";
import ScriptGeneratorModule from "./src/modules/scriptGenerator/scriptGenerator.module"
import ToneModule from "./src/modules/tone/tone.module"
import YoutubeModule from "./src/modules/youtubeChannel/youtubeChannel.module"
import 'dotenv/config';


// Create a new service broker
const broker = new ServiceBroker({
  nodeID: "node-1",
  transporter: "NATS", 
  logger: true,
  hotReload: true
});



// Load API Gateway (if you have one)
broker.createService(ApiService);
broker.createService(MongooseService)

// Load the Modules
broker.createService(UserModule);
broker.createService(ScriptGeneratorModule);
broker.createService(ToneModule);
broker.createService(YoutubeModule)

// Start the broker
broker.start().then(() => {
  broker.repl(); 
  const apiService = broker.getLocalService("api");
  console.log("Registered routes:", apiService.settings.routes);

});
