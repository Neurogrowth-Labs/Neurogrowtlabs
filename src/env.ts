const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim() ?? '';

export const env = {
  geminiApiKey,
};

export function hasGeminiApiKey() {
  return env.geminiApiKey.length > 0;
}
