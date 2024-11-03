import YoutubeChannelController from './controller/youtubeChannel.controller';
import YoutubeChannelService from './services/youtubeChannel.service';
import { ServiceSchema } from "moleculer";


const YoutubeChannelModule: ServiceSchema = {
    name: "youtubeChannel",
    mixins: [YoutubeChannelController, YoutubeChannelService],
  };

export default YoutubeChannelModule;