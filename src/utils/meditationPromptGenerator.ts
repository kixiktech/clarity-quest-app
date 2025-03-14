import { fetchUserResponses } from "@/components/ObjectGenerator";

interface MeditationPrompt {
  systemPrompt: string;
  userPrompt: string;
}

export async function generateMeditationPrompt(category?: string): Promise<MeditationPrompt | null> {
  try {
    const responses = await fetchUserResponses();
    if (!responses) return null;

    // Get the focus response regardless of category
    const focusResponse = responses.responses.focus;

    // If a specific category is provided, focus on that category's response
    if (category) {
      // Map the category name to the database category key
      let categoryKey: string;
      
      switch(category) {
        case 'career':
          categoryKey = 'career';
          break;
        case 'money':
          categoryKey = 'finances';
          break;
        case 'growth':
          categoryKey = 'personal-growth';
          break;
        case 'confidence':
          categoryKey = 'confidence';
          break;
        case 'health':
          categoryKey = 'health';
          break;
        case 'friends':
        case 'family':
        case 'relationships':
          categoryKey = 'relationships';
          break;
        default:
          categoryKey = category;
      }
      
      // Get the response for this category
      const categoryResponse = responses.responses[categoryKey as keyof typeof responses.responses];
      
      if (!categoryResponse) {
        console.log(`No response found for category: ${category} (mapped to ${categoryKey})`);
        return null;
      }

      const systemPrompt = `You are a compassionate meditation and visualization guide with a soothing, gentle voice. Create an immersive journey that guides listeners toward their goals with warmth and understanding. Incorporate natural pauses and breathing moments without explicitly marking them. Use rich sensory details and calming imagery.`;

      const userPrompt = `Create a deeply personal guided meditation focused on ${category}:

Category goal: ${categoryResponse}

${focusResponse ? `Specific focus: ${focusResponse}` : ''}

Guide them through:
1. A gentle settling into presence
2. A serene journey through their inner landscape
3. A vivid experience of their desired future in this area
4. A peaceful return to the present moment

Keep the pacing natural and gentle, suitable for a 5-10 minute meditation. Use evocative imagery and sensory details to create a fully immersive experience.`;

      return {
        systemPrompt,
        userPrompt
      };
    }

    // If no category is provided, use the original behavior with focus response
    const otherResponses = { ...responses.responses };
    delete otherResponses.focus;

    const contextResponses = Object.entries(otherResponses)
      .filter(([_, value]) => value !== null)
      .map(([category, value]) => `${category}: ${value}`)
      .join('\n');

    const systemPrompt = `You are a compassionate meditation and visualization guide with a soothing, gentle voice. Create an immersive journey that guides listeners toward their goals with warmth and understanding. Incorporate natural pauses and breathing moments without explicitly marking them. Use rich sensory details and calming imagery.`;

    const userPrompt = `Create a deeply personal guided meditation that weaves together:

${contextResponses}

Guide them through:
1. A gentle settling into presence
2. A serene journey through their inner landscape
3. A vivid experience of their desired future
4. A peaceful return to the present moment

Focus your meditation on: ${focusResponse || 'personal growth and mindfulness'}

Keep the pacing natural and gentle, suitable for a 5-10 minute meditation. Use evocative imagery and sensory details to create a fully immersive experience.`;

    return {
      systemPrompt,
      userPrompt
    };
  } catch (error) {
    console.error('Error generating meditation prompt:', error);
    return null;
  }
} 