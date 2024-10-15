import { ServiceSchema } from "moleculer";
import ScriptGeneratorController from "../controllers/scriptGenerator.controller"


const ScriptGeneratorService: ServiceSchema = {
  name: "scriptGenerator.service",
  
  actions: {
    async create(ctx) {
        return ScriptGeneratorController.actions.create(ctx);
      },
  }
};

export default ScriptGeneratorService;

