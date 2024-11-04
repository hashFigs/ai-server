import CustomContext from "../../../common/types/context";
import axios from "axios";


const ScriptGeneratorController = {
  name: "scriptGenerator.controller",
  
  actions: {
    async create(ctx: CustomContext): Promise<{ message: string; script: string }> {
     const  {title, language, selectedCategory, formatType, videoTopic, audienceDescription, selectedVoice} = ctx.params;

     /*  if (!topic || !length || !language) {
        throw new Error("Missing parameters");
      } */
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
                content: `I want to create a Video Script about ${videoTopic} with a format of ${formatType}, and the length ${selectedCategory} addreced to the audience: ${audienceDescription} in ${language}`,
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
        

       // console.log(JSON.stringify(response.data, null, 2));
        //console.log(response.data.choices[0].message.content);



        // Safely get the script content from the API response
        const scriptContent = response.data.choices[0].message.content ?? "No script generated";
        console.log("Script generated successfully")
        return {
          message: "Script generated successfully",
          script: scriptContent
        };
      } catch (error) {
        console.error("Error calling external API:", error);
        throw new Error("Failed to generate script");
      }
    },
    async rewrite(ctx: CustomContext): Promise<{ message: string; script: string }> {

      const  {originalScript, comments} = ctx.params;
 
      /*  if (!topic || !length || !language) {
         throw new Error("Missing parameters");
       } */
 
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
                 content: `Can you rewrite this script ${originalScript} taking in consideration the follow comments for each paragraph ${comments}`,
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
         
 
         console.log(JSON.stringify(response.data, null, 2));
         console.log(response.data.choices[0].message.content);
 
 
 
         // Safely get the script content from the API response
         const scriptContent = response.data.choices[0].message.content ?? "No script generated";
 
         return {
           message: "Script generated successfully",
           script: scriptContent
         };
       } catch (error) {
         console.error("Error calling external API:", error);
         throw new Error("Failed to generate script");
       }
     }
  },
  

};

export default ScriptGeneratorController;
