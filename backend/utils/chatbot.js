module.exports = function botReply(message) {
// Simple canned replies; later replace with OpenAI/your model
const m = message.toLowerCase();
if (m.includes('explain') || m.includes('what is')) return 'Here is a short explanation: ... (expand later with real AI).';
if (m.includes('solve') || m.includes('example')) return 'Try this example: ...';
return "I'm an AI tutor placeholder — ask me about a topic or request an example.";
};