import CustomContext from "../../../common/types/context";
import axios from "axios";


const ScriptGeneratorController = {
  name: "scriptGenerator.controller",
  
  actions: {
    // Define the return type properly (you can adjust it based on your expected output)
    async create(ctx: CustomContext): Promise<{ message: string; script: string }> {
      const { topic, length, language } = ctx.params;

      if (!topic || !length || !language) {
        throw new Error("Missing parameters");
      }

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
                content: `Explica ${topic} en català i amb una durada maxima de ${length}`
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

  /* methods: {
    // You can still use the method if you want to keep this for future use
    async generateScriptFromAPI(topic: string, length: string, language: string): Promise<string> {
      try {
        const apiKey = process.env.OPENAI_API_KEY;

        console.log("apikey", apiKey)
        const apiUrl = "https://api.openai.com/v1/completions";

        // Set up your API request payload
        const response = await axios.post(
          apiUrl,
          {
            model: "text-davinci-003", // Model to use (adjust based on the service)
            prompt: `Generate a YouTube video script on the topic of ${topic} in ${language} with a length of ${length}.`,
            max_tokens: 1500 // Adjust token length as needed
          },
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            }
          }
        );

        // Safely return the script content from the API response
        const scriptContent =  response.data.choices[0].message.content;

        console.log("@@@scriptContent", scriptContent)

        return scriptContent;
      } catch (error) {
        console.error("Error calling external API:", error);
        throw new Error("Failed to generate script");
      }
    }
  } */
};

export default ScriptGeneratorController;
