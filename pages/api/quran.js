import { Configuration, OpenAIApi } from 'openai';
// import translate from "translate";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

    // translate.engine = "google"; // Or "yandex", "libre", "deepl"
    // translate.key = process.env.GOOGLE_KEY;

    // const text = await translate("Hello world", "hi");

    const { Question } = req.body;
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: generatePrompt(Question),
        temperature: 0.6,
        max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text});
}

function generatePrompt(Question) {
    return `Act as a Muslim imam who gives me guidance and advice on how to deal with life problems. Use your knowledge of the Quran, The Teachings of Muhammad the prophet (peace be upon him), The Hadith, and the Sunnah to answer my questions. My question is ${Question}? answer the question in a way that is easy to understand and in a way that I can apply to my life. And the most important is  answer should be in urdu but use english alphabets.`;
}