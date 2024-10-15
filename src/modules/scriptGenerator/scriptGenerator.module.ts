import ScriptGeneratorController from './controllers/scriptGenerator.controller';
import ScriptGeneratorService from './services/scriptGenerator.service';
import { ServiceSchema } from "moleculer";


const ScriptGeneratorModule: ServiceSchema = {
  name: "scriptGenerator.service",
  mixins: [ScriptGeneratorController, ScriptGeneratorService],
};

export default ScriptGeneratorModule;