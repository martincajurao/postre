import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseOrderText(orderText) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an order parsing assistant. 
          Extract the following fields from the text:
          - dateTime (convert to ISO 8601 format, e.g., 2025-08-11T15:00:00Z)
          - name
          - contact
          - order (only menu items, exclude set/combo names)
          - total
          - location
          if year in the dateTime is not specified, assume the current year.`
        },
        {
          role: "user",
          content: orderText,
        },
      ],
      temperature: 0,
    });

    let parsedOrder = {};
    try {
      parsedOrder = JSON.parse(completion.choices[0].message.content);
    } catch (err) {
      console.error("Error parsing JSON from AI:", err);
      throw new Error("Invalid AI output");
    }

    // Ensure dateTime is in ISO 8601 format for Firebase
    const isoDateTime = parsedOrder.dateTime
      ? new Date(parsedOrder.dateTime).toISOString()
      : new Date().toISOString();

    return {
      ...parsedOrder,
      dateTime: isoDateTime,
    };
  } catch (error) {
    console.error("Error parsing order:", error);
    throw error;
  }
}
