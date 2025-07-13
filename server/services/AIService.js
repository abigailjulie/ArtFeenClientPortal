import dotenv from "dotenv";
dotenv.config();

export default class AIService {
  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  }

  async generateWelcomeMessage(clientData) {
    if (!this.geminiApiKey) {
      console.log("No Gemini api key provided, using default message");
      return this.getDefaultWelcomeMessage();
    }

    try {
      const prompt = this.buildOnboardingPrompt(clientData);

      const aiMessage = await this.callGeminiAPI(prompt);

      return aiMessage || this.getDefaultWelcomeMessage();
    } catch (error) {
      console.log("Gemini API failed:", error.message);

      return this.getDefaultWelcomeMessage();
    }
  }

  buildOnboardingPrompt(clientData) {
    const companyName =
      clientData.company?.name || clientData.company || "your organization";

    const username = clientData.username || "there";

    return `You are a helpful assistant writing professional onboarding emails.
    
    Write a brief welcome message for ${username} from ${companyName} who just created an account on The ArchWay, a project management portal.

    The greeting line ("Welcome to The ArchWay, ${username}") is already included in the email template. Do not repeat it.

    Your task is to write a follow-up message explaining what the user should do next.

    Requirements:
    - Mention their next step: create their first project using "New Project" button at the top of the dashboard
    - Mention they'll need: project name, project address, and telephone number
    - Let them know that features like budget tracking and progress updates will become available once the project is created and their profile has been updated by an administrator
    - Use correct grammar and punctuation
    - Keep it to 3-4 short sentences
    - Use a professional, welcoming tone
    
    Tone: professional, welcoming, and action-oriented
    Length: 3-4 short sentences max
    Output only the message text — no headings, formatting, or commentary.`;
  }

  async callGeminiAPI(prompt) {
    const response = await fetch(`${this.apiUrl}?key=${this.geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 150,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0) {
      const generatedText = result.candidates[0].content.parts[0].text.trim();
      return this.cleanGeneratedText(generatedText);
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
