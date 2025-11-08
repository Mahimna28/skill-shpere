/**
 * Skill Sphere API Library
 * * This file contains helper functions for making API calls.
 * Currently, it holds the Gemini API caller.
 * In a real MERN app, this would also have functions like:
 * - loginUser(email, password)
 * - signupUser(userData)
 * - fetchCourses()
 * - postMessage(chatData)
 */

/**
 * Calls the Gemini API for text generation.
 * @param {string} userQuery - The user's prompt.
 * @param {string} [systemPrompt=""] - Optional system instruction for the model.
 * @returns {Promise<string>} - The AI's response text.
 */
export const callGeminiAPI = async (userQuery, systemPrompt = "") => {
  const apiKey = ""; // Leave blank
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
  };

  if (systemPrompt) {
    payload.systemInstruction = {
      parts: [{ text: systemPrompt }]
    };
  }

  // Implement exponential backoff for retries
  let response;
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        const candidate = result.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
          return candidate.content.parts[0].text;
        } else {
          throw new Error("Invalid API response structure.");
        }
      } else if (response.status === 429) { // Throttling
        // Wait and retry
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw new Error(`API error: ${response.statusText}`);
      }
    } catch (error) {
      if (i === 4) { // Last retry failed
        console.error("Failed to call Gemini API:", error);
        return "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  return "Sorry, I'm unable to respond at the moment.";
};