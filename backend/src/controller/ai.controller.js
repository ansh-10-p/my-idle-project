
const {generateContent}= require("../services/ai.service");   

module.exports.getResponse= async (req, res) => {
  try {

    const code =req.body.prompt;
    if (!code)
         {
      return res.status(400).send("prompt is required");
    }

    const review = await generateContent(code);
    res.send(review);
  } catch (error) {
    console.error("Controller Error : ",error);
    res.status(500).send("Internal Server Error");
  }
};
