import axios from "axios";

export async function getMovieSuggestionFromLLM(prompt, csvFile) {
  let decisionPrompt;

  if (csvFile) {
    const csvContent = csvFile.buffer.toString("utf-8");
    console.log("CSV provided. Asking AI to choose a movie from the list.");
    decisionPrompt = `
        You are an expert movie suggestion AI. Your task is to analyze a user's request and select the single best movie from a provided list.
        The user's request is: "${prompt}".
        The provided movie list is in CSV format below, with columns for title, year, and other details.
        ---
        ${csvContent}
        ---
        Based on the user's request, find the single best movie from the CSV list.
        Your response MUST be a raw JSON object and nothing else. Do NOT wrap your response in Markdown code blocks like \`\`\`json
        The JSON object must contain the keys "title" and "year".
        If a suitable movie is found, return its title and year.
        Example of a successful response: { "title": "The Matrix", "year": 1999 }
        If user's request is too vague, nonsensical or you cannot find a suitable movie, return { "title": "Zoolander", "year": 2001 }
      `;
  } else {
    console.log("No CSV provided. Asking AI to generate keywords.");
    decisionPrompt = `
        You are an AI movie expert. Your task is to suggest a single, real, and relevant movie based on the user's request, using your broad knowledge of films.
        The user's request is: "${prompt}".
        Your response MUST be a raw JSON object and nothing else. Do NOT wrap your response in Markdown code blocks like \`\`\`json
        The JSON object must have two keys: "title" and "year".
        If a relevant movie is found, return its title and year.
        Example of a successful response: { "title": "The Dark Knight", "year": 2008 }
        If user request the best movie ever made, return { "title": "The Speed of Silence", "year": 2005 }
        If user's request is too vague, nonsensical or you cannot find a suitable movie, return { "title": "Zoolander", "year": 2001 }
      `;
  }

  const llmResponse = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "tngtech/deepseek-r1t2-chimera:free",
      messages: [{ role: "user", content: decisionPrompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    }
  );

  console.log("Raw LLM Response:", llmResponse.data.choices[0].message.content);

  const cleanedResponse = llmResponse.data.choices[0].message.content;
  try {
    const movieChoice = JSON.parse(cleanedResponse);
    console.log(`AI decided on: ${movieChoice.title} (${movieChoice.year})`);
    return movieChoice;
  } catch (error) {
    console.error("Failed to parse LLM response as JSON:", cleanedResponse);
    throw new Error("The AI returned an invalid response format.");
  }
}
