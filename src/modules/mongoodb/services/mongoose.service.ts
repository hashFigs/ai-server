import mongoose from "mongoose";
import { ServiceSchema, Service } from "moleculer";

interface MongooseSettings {
  uri: string;
}

const MongooseService: ServiceSchema<MongooseSettings> = {
  name: "mongoose",
  settings: {
    uri: "mongodb://localhost:27017/AI", 
  },

  async started() {
    const service = this as unknown as Service<MongooseSettings>; // Cast to 'unknown' first
    try {
      await mongoose.connect(service.settings.uri); // Access settings after casting
      service.logger.info("MongoDB connected.");
    } catch (err) {
      service.logger.error("MongoDB connection error.", err);
    }
  },

  async stopped() {
    const service = this as unknown as Service<MongooseSettings>; // Cast to 'unknown' first
    await mongoose.disconnect();
    service.logger.info("MongoDB disconnected.");
  },
};

export default MongooseService;
