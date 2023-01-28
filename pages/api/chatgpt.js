import { PromptableApi } from "promptable";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatgpt = async (req, res) => {
  const { message, promptId } = req.body;
  console.log("api call entry", message, promptId);
  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }
  if (!promptId) {
    res.status(400).json({ error: "Prompt ID is required" });
    return;
  }
  // call prompt ai api and openai api
  const reply = await getReply(message, promptId);
  res.status(200).json({ reply });
  return;
};

const getReply = async (message, promptId) => {
  // get prompt from prompt ai api based on promptId
  if (!promptId) {
    throw new Error("Prompt ID is required");
  }
  const promptDeployment = await PromptableApi.getActiveDeployment({
    promptId: promptId,
  });
  console.log("prompt deployment", promptDeployment);
  if (!promptDeployment) {
    throw new Error("Prompt deployment not found");
  }
  // replace prompt with message
  const revisedPrompt = {
    ...promptDeployment,
    text: promptDeployment.text.replace("{{input}}", message),
  };
  console.log("revised prompt", revisedPrompt);
  // call openai api
  const response = await openai.createCompletion({
    model: revisedPrompt.config.model,
    prompt: revisedPrompt.text,
    temperature: revisedPrompt.config.temperature,
    max_tokens: revisedPrompt.config.max_tokens,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: revisedPrompt.config.stop,
  });
  console.log("openai response", response.data);
  if (response.data.choices && response.data.choices.length > 0) {
    return response.data.choices[0].text;
  } else {
    return "I'm sorry, I don't understand.";
  }
};

export default chatgpt;
