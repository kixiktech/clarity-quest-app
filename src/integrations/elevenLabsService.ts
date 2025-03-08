import axios from "axios";

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = import.meta.env.VITE_VOICE_ID;
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

export const generateSpeech = async (text: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        text: text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true,
        },
        settings: {
          speed: 0.85,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    return new Blob([response.data], { type: "audio/mpeg" });
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};
