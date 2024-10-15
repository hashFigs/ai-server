import { ServiceBroker } from "moleculer";

import ApiService from "./services/api.service"; 
import MongooseService from "./src/modules/mongoodb/services/mongoose.service";
import UserModule from "./src/modules/user/user.module";
import ScriptGeneratorModule from "./src/modules/scriptGenerator/scriptGenerator.module"
import 'dotenv/config';


// Create a new service broker
const broker = new ServiceBroker({
  nodeID: "node-1",
  transporter: "NATS", // Choose your preferred transporter
  logger: true,
  hotReload: true
});



// Load API Gateway (if you have one)
broker.createService(ApiService);
broker.createService(MongooseService)

// Load the Modules
broker.createService(UserModule);

broker.createService(ScriptGeneratorModule);

// Start the broker
broker.start().then(() => {
  broker.repl(); 

});
