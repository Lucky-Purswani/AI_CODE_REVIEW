const aiService = require('../services/ai.service');

module.exports.getResponse = async (req, res) => {
    const prompt = req.body.prompt || "Default prompt";
    const response = await aiService.generateReview(prompt);
    res.send(response);
};
