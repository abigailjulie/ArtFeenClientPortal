import dotenv from "dotenv";
dotenv.config();

export default class AIService {
  constructor() {
    this.huggingFaceToken = process.env.HUGGING_FACE_TOKEN;
    this.apiUrl = "https://api-inference.huggingface.co/models";
  }

  async generateWelcomeMessage(clientData) {
    if (!this.huggingFaceToken) {
      console.log("No Hugging Face token provided, using default message");
      return this.getDefaultWelcomeMessage();
    }

    try {
      const prompt = this.buildOnboardingPrompt(clientData);

      const aiMessage = await this.callHuggingFaceAPI(prompt);

      return aiMessage || this.getDefaultWelcomeMessage();
    } catch (error) {
      console.log("AI message generation failed:", error.message);

      return this.getDefaultWelcomeMessage();
    }
  }

  buildOnboardingPrompt(clientData) {
    const companyName =
      clientData.company?.name || clientData.company || "your organization";

    const username = clientData.username || "there";

    return `You are a helpful assistant writing professional onboarding emails.
    
    Write a brief welcome message for ${username} from ${companyName} who just created an account on The ArchWay, a project management portal.

    Requirements:
    - Welcome them professionally
    - Mention their next step: create their first project using "New Project" button at the top of the dashboard
    - List required info: project name, address, telephone
    - Mention they can track progress and budgets
    - Keep it to 3-4 short sentences
    - Use a professional, welcoming tone
    
    Tone: professional, welcoming, and action-oriented
    Length: 3-4 short sentences max
    Output only the message text — no headings, formatting, or commentary.`;
  }

  async callHuggingFaceAPI(prompt) {
    const models = [
      "microsoft/DialoGPT-large",
      "facebook/blenderbot-1B-distill",
      "gpt2-medium",
    ];

    for (const model of models) {
      try {
        const response = await fetch(`${this.apiUrl}/${model}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.huggingFaceToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.6,
              do_sample: true,
              return_full_text: false,
              pad_token_id: 50256,
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`Model ${model} failed:`, {
            status: response.status,
            error: errorText,
          });
          continue;
        }

        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          let generatedText = result[0].generated_text?.trim();

          if (generatedText) {
            generatedText = this.cleanGeneratedText(generatedText);

            if (generatedText.length > 30 && generatedText.length < 500) {
              return generatedText;
            }
          }
        }
      } catch (error) {
        console.warn(`Failed to call model ${model}:`, {
          error: error.message,
          model,
        });
        continue;
      }
    }
    return null;
  }

  cleanGeneratedText(text) {
    return text
      .replace(/^(AI:|Assistant:|Here's|Here is)/i, "")
      .replace(/\n\s*\n/g, "\n")
      .replace(/^\s*[-•]\s*/gm, "")
      .replace(/\s+/g, " ")
      .replace(/\.\s*$/, "")
      .trim();
  }

  getDefaultWelcomeMessage() {
    return `Welcome to your project management portal! To get started, create your first project by clicking "New Project" in your dashboard.

    You'll need these details ready:
    • Project name
    • Project address  
    • Project telephone number

    Once your project is created, you'll be able to track progress, manage budgets, monitor timelines, and view detailed status updates.`;
  }
}
