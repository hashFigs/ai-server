import CustomContext from "../../../common/types/context";
import axios from "axios";
import { parseResponseToJSON } from "../../../utils/parseOpenApi"
import ToneModel from "../model/tone.model";



const ToneController = {
  name: "tone.controller",
  
  actions: {
    async create(ctx: CustomContext): Promise<{ message: string; tone: any, tonePreview: string; }> {
     const  {inputText} = ctx.params;  
      try {
        const apiKey = process.env.OPENAI_API_KEY;

        const apiUrl = "https://api.openai.com/v1/chat/completions";

        // Set up your API request payload
        const response = await axios.post(
          apiUrl,
          {
            model: "gpt-3.5-turbo", 
            messages: [
              {
                role: "user",
                content: `Please analyze the following text for the following characteristics:
                            1. **Tone**: Describe the emotional quality (e.g., formal, casual, humorous, serious).
                            2. **Word Choice**: Note whether the language is simple, sophisticated, or contains slang or jargon.
                            3. **Sentence Structure**: Describe the length and complexity of the sentences (short, punchy, long, complex).
                            4. **Pacing**: Does the text feel fast-paced or slow? Is there repetition or emphasis?
                            5. **Formality**: How formal or informal is the language?
                            6. **Personality**: Does the text come across as confident, humorous, empathetic, or neutral?
                            7. **Cultural or Regional Influence**: Does the text contain references or idioms related to specific cultural or regional contexts?
                            8. **Level of Detail**: Does the text provide detailed explanations or stay at a high level?
                            9. **Figurative Language**: Is there use of metaphors, analogies, or other figurative language?

                            Here is the text:

                            ${inputText}
                            `,
              }
            ],
            max_tokens: 100 
          },
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            }
          }
        );
        

        // Safely get the tone content from the API response
        const toneContent = response.data.choices[0].message.content ?? "No script generated";
        const jsonTone = parseResponseToJSON(toneContent);

        const newTone = new ToneModel({
          userId: ctx.meta.userId,
          inputSample: inputText,
          tone: jsonTone.tone,
          wordChoice: jsonTone.wordChoice,
          sentenceStructure: jsonTone.sentenceStructure,
          pacing: jsonTone.pacing,
          formality: jsonTone.formality,
        });
  
        await newTone.save();

        const tonePreviewResponse: { message: string; tonePreview: string } = await ctx.call(
          "tone.service.tonePreview", 
          { inputText: inputText as string}
        );


        return {
          message: "Script generated successfully",
          tone: jsonTone,
          tonePreview: tonePreviewResponse.tonePreview 
        };
      } catch (error) {
        console.error("Error calling external API:", error);
        throw new Error("Failed to generate script");
      }
    },


    async tonePreview(ctx: CustomContext): Promise<{ message: string; tonePreview: string }> {
      console.log("paarms", ctx.params) 
      const  {inputText} = ctx.params;
 
 
       try {
         const apiKey = process.env.OPENAI_API_KEY;
 
         const apiUrl = "https://api.openai.com/v1/chat/completions";
 
         // Set up your API request payload
         const response = await axios.post(
           apiUrl,
           {
             model: "gpt-3.5-turbo", 
             messages: [
               {
                 role: "user",
                 content: `Please rewrite the following idea:
                             ${inputText}
                            to be a youtube script.  
                             `,
               }
             ],
             max_tokens: 100 
           },
           {
             headers: {
               "Authorization": `Bearer ${apiKey}`,
               "Content-Type": "application/json"
             }
           }
         );
        
         // Safely get the tone content from the API response
         const toneContent = response.data.choices[0].message.content ?? "No script generated";
     
         return {
           message: "Script generated successfully",
           tonePreview: toneContent
         };
       } catch (error) {
         console.error("Error calling external API:", error);
         throw new Error("Failed to generate script");
       }
     },
     async getAll(ctx: CustomContext): Promise<{ message: string; tone: any }> {
      
      const {userId} = ctx.meta
      const tones = await ToneModel.find({userId: userId})


      return({
        "message": "success",
        "tone": tones,
      })
     }
  },
  

};

export default ToneController;
