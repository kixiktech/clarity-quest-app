import axios from 'axios';
import { generateMeditationPrompt } from '@/utils/meditationPromptGenerator';

interface ChatCompletion {
  content: string;
  error?: string;
}

export async function generateMeditationResponse(): Promise<ChatCompletion> {
  try {
    // Get meditation prompts
    const meditationPrompt = await generateMeditationPrompt();
    
    if (!meditationPrompt) {
      return { content: '', error: 'Failed to generate meditation prompt' };
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: meditationPrompt.systemPrompt },
          { role: 'user', content: meditationPrompt.userPrompt }
        ],
        temperature: 0.7,        // Balanced creativity and consistency
        max_tokens: 800,         // Suitable for 5-10 minute meditation
        presence_penalty: 0.6,   // Encourages topic diversity
        frequency_penalty: 0.3,  // Reduces repetition
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return { content: response.data.choices[0].message.content };
  } catch (error) {
    console.error('Error generating meditation response:', error);
    return { 
      content: '', 
      error: error instanceof Error ? error.message : 'Failed to generate response' 
    };
  }
}
