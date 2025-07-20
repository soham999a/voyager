// Voyager Station API Integration
// Supports multiple FREE AI providers and NASA APIs

interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// 🚀 NASA API Functions (100% FREE)
export class NASAApi {
  private static apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
  private static baseUrl = 'https://api.nasa.gov';

  // Get Astronomy Picture of the Day
  static async getAPOD(): Promise<APIResponse<any>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/planetary/apod?api_key=${this.apiKey}`
      );
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: null, success: false, error: 'Failed to fetch NASA APOD' };
    }
  }

  // Get ISS Current Location
  static async getISSLocation(): Promise<APIResponse<any>> {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: null, success: false, error: 'Failed to fetch ISS location' };
    }
  }

  // Get People in Space
  static async getPeopleInSpace(): Promise<APIResponse<any>> {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json');
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: null, success: false, error: 'Failed to fetch people in space' };
    }
  }

  // Get Mars Weather (InSight)
  static async getMarsWeather(): Promise<APIResponse<any>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/insight_weather/?api_key=${this.apiKey}&feedtype=json&ver=1.0`
      );
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: null, success: false, error: 'Failed to fetch Mars weather' };
    }
  }
}

// 🤖 AI API Functions (Multiple FREE Options)
export class AIApi {
  // Groq API (FASTEST & FREE - 500+ tokens/sec)
  static async chatWithGroq(message: string): Promise<APIResponse<string>> {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) {
      return { data: '', success: false, error: 'Groq API key not configured' };
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Fast and capable
          messages: [
            {
              role: 'system',
              content: 'You are ARIA, the AI assistant aboard the Voyager Palen space station. Respond in character as a helpful, knowledgeable ship AI with a professional but friendly tone.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Unable to process request';
      return { data: reply, success: true };
    } catch (error) {
      return { data: '', success: false, error: 'Failed to communicate with Groq' };
    }
  }

  // Hugging Face API (100% FREE)
  static async chatWithHuggingFace(message: string): Promise<APIResponse<string>> {
    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return { data: '', success: false, error: 'Hugging Face API key not configured' };
    }

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Ship AI ARIA: ${message}`,
          parameters: {
            max_length: 200,
            temperature: 0.7,
          }
        }),
      });

      const data = await response.json();
      const reply = data[0]?.generated_text || 'Processing your request...';
      return { data: reply, success: true };
    } catch (error) {
      return { data: '', success: false, error: 'Failed to communicate with Hugging Face' };
    }
  }

  // Google Gemini API (FREE)
  static async chatWithGemini(message: string): Promise<APIResponse<string>> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return { data: '', success: false, error: 'Gemini API key not configured' };
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are ARIA, the AI assistant aboard the Voyager Palen space station. User message: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to process request';
      return { data: reply, success: true };
    } catch (error) {
      return { data: '', success: false, error: 'Failed to communicate with Gemini' };
    }
  }

  // Smart AI Router - Tries available APIs in order of preference
  static async chat(message: string): Promise<APIResponse<string>> {
    // Try Groq first (fastest)
    if (process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      const result = await this.chatWithGroq(message);
      if (result.success) return result;
    }

    // Try Gemini second (good quality)
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      const result = await this.chatWithGemini(message);
      if (result.success) return result;
    }

    // Try Hugging Face last (always free)
    if (process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
      const result = await this.chatWithHuggingFace(message);
      if (result.success) return result;
    }

    return { 
      data: 'ARIA is currently offline. Please configure at least one AI API key.', 
      success: false, 
      error: 'No AI APIs configured' 
    };
  }
}

// 📰 Space News API (100% FREE)
export class SpaceNewsApi {
  private static baseUrl = 'https://api.spaceflightnewsapi.net/v3';

  static async getLatestNews(limit: number = 10): Promise<APIResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/articles?_limit=${limit}`);
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: [], success: false, error: 'Failed to fetch space news' };
    }
  }

  static async getBlogs(limit: number = 5): Promise<APIResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/blogs?_limit=${limit}`);
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: [], success: false, error: 'Failed to fetch space blogs' };
    }
  }
}

// 🗄️ Supabase Integration (Optional - FREE Database)
export class DatabaseApi {
  private static supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  private static supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  static async saveUserSession(userData: any): Promise<APIResponse<any>> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      return { data: null, success: false, error: 'Supabase not configured' };
    }

    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/user_sessions`, {
        method: 'POST',
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { data: null, success: false, error: 'Failed to save user session' };
    }
  }
}
