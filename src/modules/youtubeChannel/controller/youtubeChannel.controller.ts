import CustomContext from "../../../common/types/context";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript"; // Correct import if using 'youtube-transcript'
import YoutubeChannelModel from "../model/youtubeChanel.model";

const baseUrl = process.env.YOUTUBE_API_BASE_URL || "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = process.env.YOUTUBE_API_KEY_V3 || "missingApiKey"; 

async function fetchLast3videos(channelId: string, youtubeApiKey:string) {
  try {
    const searchResponse = await axios.get(`${baseUrl}/search`, {
      params: {
        part: "snippet",
        channelId: channelId,
        order: "date",
        maxResults: 3, 
        type: "video", 
        key: youtubeApiKey,
      },
    });
    return searchResponse.data.items.map((item: any) => item.id.videoId);
  } catch (error) {
    console.error("Failed to fetch last 3 videos:", (error as Error).message);
    throw new Error("Failed to fetch last 3 videos.");
  }
}

async function fetchTranscript(videoId: string) {
  try {
    const transcript =  await YoutubeTranscript.fetchTranscript(videoId);
    
    const combinedText = transcript
    .map((segment: { text: string }) => segment.text)
    .join(" ");
  
  return combinedText;

  } catch (error) {
    console.error(`Failed to fetch transcript for video ID: ${videoId}`, (error as Error).message);
    return null;
  }
}

const YoutubeChannelController = {
  name: "youtubeChannel.controller",
  actions: {
    async create(ctx: CustomContext) {
      return { message: "youtube Channel" };
    },

    async getChannels(ctx: CustomContext) {
       const { userId } = ctx.meta;
       
       try {
        
        const channels = await YoutubeChannelModel.find({ user: userId })
          .populate('user') 
          .exec();
    
        return channels; 
      } catch (error) {
        console.error("Error fetching channels:", error);
        throw new Error("Could not retrieve channels"); 
      }


    },

    async fetchChannelData(ctx: CustomContext) {
      const { handle } = ctx.params;
      const {token, userId} = ctx.meta;
     

      const youtubeApiKey = process.env.YOUTUBE_API_KEY_V3 as string; 


      if (!handle) {
        throw new Error("Channel handle is required");
      }

      try {
        // Step 1: Search for the channel by handle
        const searchResponse = await axios.get(`${baseUrl}/search`, {
          params: {
            part: "snippet",
            type: "channel",
            q: handle,
            key: youtubeApiKey,
          },
        });

        if (searchResponse.data.items && searchResponse.data.items.length > 0) {
          const channelData = searchResponse.data.items[0];
          const channelId = channelData.id.channelId;


          const lastVideosId = await fetchLast3videos(channelId, youtubeApiKey);

          // Fetch transcripts for each video
          const transcripts = await Promise.all(
            lastVideosId.map(async (videoId: string) => {
              const transcript = await fetchTranscript(videoId);
              return { videoId, transcript };
            })
          );
          

          const newChannel = new YoutubeChannelModel( {
              channelId: channelId,
              handle: handle,
              title: channelData.snippet.channelTitle,
              description: channelData.snippet.description,
              transcripts: transcripts, 
              user: userId

          })
          
          await newChannel.save();
 //          console.log("Last Channel", newChannel)

          return {
            channelData,
            transcripts,
          };
        } else {
          return { message: "No data found for this channel." };
        }
      } catch (error) {
        console.error("Error fetching channel data:", (error as Error).message);
        throw new Error("Failed to fetch channel data.");
      }
    },
  },
};

export default YoutubeChannelController;
