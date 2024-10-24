import { ServiceSchema } from "moleculer";
import ToneController from "../controllers/tone.controller"


const ToneService: ServiceSchema = {
  name: "tone.service",
  
  actions: {
    async create(ctx) {
        return ToneController.actions.create(ctx);
      },
  }
};

export default ToneService;