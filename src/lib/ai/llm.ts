import OpenAI from "openai";

export interface ReasoningResult {
  thought: string;
  action: {
    type: 'click' | 'type' | 'scroll' | 'wait' | 'submit';
    target?: string; // CSS selector or natural language description
    value?: string;
    coordinates?: { x: number; y: number };
  };
}

export class LLMProvider {
  private openai: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
  }

  async analyzeScreen(screenshotBase64: string, context: string): Promise<ReasoningResult> {
    if (!this.openai) {
      // Return a simulated result if no key is provided
      return {
        thought: "Simulated thought: I see a 'Sign In' button. I should proceed to login.",
        action: { type: 'click', target: 'button:has-text("Sign In")' }
      };
    }

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are ARIA, an autonomous revenue intelligence agent. Your goal is to work on freelance platforms. 
          Analyze the provided screenshot and context. Decide on the NEXT action. 
          Return JSON in the format: { "thought": "your reasoning", "action": { "type": "click|type|scroll|wait", "target": "selector", "value": "optional", "coordinates": {"x": 1, "y": 2} } }`
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Current Context: ${context}` },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${screenshotBase64}` }
            }
          ]
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }
}

export const llmProvider = new LLMProvider();
