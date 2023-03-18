const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const handler = async (req, res) => {
  const configuration = new Configuration({
    organization: "org-hyP2KEAIrKXpfzcUQqrAVUV4",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

    const messages = [];

    messages.push({ role: "user", content: req.body });
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      return res.status(200).json({data:completion_text});

    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      return res.status(400).json("failed");
    }
  }

  export default handler;