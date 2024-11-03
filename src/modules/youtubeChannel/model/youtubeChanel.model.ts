import mongoose, { Schema, Document } from "mongoose";

export interface IYoutubeChannel extends Document {
  channelId: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TranscriptSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    transcript: { type: String, required: true },
  });

const YouTubeChannelSchema = new mongoose.Schema({
    channelId: { type: String, required: true },
    handle: {type: String},
    title: { type: String },
    description: { type: String },
    transcripts: { type: [TranscriptSchema] }, 
    stats: {
      views: Number,
      subscribers: Number,
      videoCount: Number,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });

const YoutubeChannelModel = mongoose.model<IYoutubeChannel>("YoutubeChannel", YouTubeChannelSchema);

export default YoutubeChannelModel;











