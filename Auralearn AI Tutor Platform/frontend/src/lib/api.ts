// File: frontend/src/lib/api.ts

const API_URL = "http://127.0.0.1:8000";

// Notice the ': string' and ': number' type definitions here? That is TypeScript!
export async function askTutor(message: string, stressLevel: number) {
  try {
    const response = await fetch(`${API_URL}/ask-tutor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, stress_level: stressLevel }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tutor response:", error);
    return { reply: "⚠️ I can't reach the brain. Is the backend server running?" };
  }
}