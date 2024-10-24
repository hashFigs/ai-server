import ToneController from './controllers/tone.controller';
import ToneService from './services/tone.service';
import { ServiceSchema } from "moleculer";


const ToneModule: ServiceSchema = {
  name: "tone.service",
  mixins: [ToneController, ToneService],
};

export default ToneModule;