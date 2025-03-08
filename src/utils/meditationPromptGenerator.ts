import { fetchUserResponses } from "@/components/ObjectGenerator";

interface MeditationPrompt {
  systemPrompt: string;
  userPrompt: string;
}

export async function generateMeditationPrompt(): Promise<MeditationPrompt | null> {
  try {
    const responses = await fetchUserResponses();
    if (!responses) return null;

    // Get focus response and other categories
    const focusResponse = responses.responses.focus;
    const otherResponses = { ...responses.responses };
    delete otherResponses.focus;

    // Combine other category responses
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