import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable browser usage
});

export async function generateSpeech(text: string): Promise<Blob | null> {
  try {
    console.log("🎙️ Generating speech with OpenAI...");
    
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      speed: 0.8,
      input: text,
    });

    // Convert the response to a Blob
    const buffer = await mp3.arrayBuffer();
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    
    console.log("✨ Speech generated successfully!");
    return blob;
  } catch (error) {
    console.error("❌ Error generating speech:", error);
    return null;
  }
} 