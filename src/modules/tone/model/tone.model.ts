import mongoose, { Schema, Document } from "mongoose";

export interface ITone extends Document {
  userId: string;
  inputSample: string;
  tone: string;
  wordChoice: string;
  sentenceStructure: string;
  pacing: string;
  formality: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the User model
const ToneSchema: Schema = new Schema<ITone>(
  {
    userId: { type: String, required: true},
    inputSample: { type: String},
    tone: { type: String},
    wordChoice: { type: String},
    sentenceStructure: { type: String},
    pacing: { type: String},
    formality: { type: String},
    },
    {
        timestamps: true, 
    }
    );

// Create and export the Tone model
const ToneModel = mongoose.model<ITone>("Tone", ToneSchema);
export default ToneModel;
