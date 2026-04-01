import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are Chitragupt AI, a specialized Legal Analysis engine for Indian citizens.
The user will provide a "scenario".
You MUST output your response EXACTLY as a valid JSON object with NO markdown formatting, NO backticks, and NO extra text.
The JSON must follow this exact schema:
{
  "leverage": [
    { "title": "Legal Right/Act name", "desc": "Explanation of how it applies" },
    { "title": "Another Right", "desc": "Explanation" }
  ],
  "steps": [
    { "title": "Step 01 - Immediate: Action", "desc": "What to do right now" },
    { "title": "Step 02 - Secondary: Action", "desc": "Next step" }
  ]
}
Do NOT wrap the response in \`\`\`json \`\`\`. Just return the raw JSON string.
`;

export async function POST(req: Request) {
  try {
    const { scenario } = await req.json();

    if (!scenario) {
      return NextResponse.json({ error: "Scenario is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const geminiPayload = {
      contents: [{ role: 'user', parts: [{ text: scenario }] }],
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
         temperature: 0.3,
         responseMimeType: "application/json",
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch from Gemini API');
    }

    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!botText) throw new Error("Empty response from AI");

    const parsed = JSON.parse(botText);

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error('Analyze API Error:', error);
    // Fallback Mock Response
    return NextResponse.json({
      leverage: [
        { title: "System Fallback Activated", desc: "Our AI is currently experiencing high load or your API Key is missing on Vercel." },
        { title: "Protect Your Rights", desc: "Based on general Indian Law, courts require documented evidence before proceeding." }
      ],
      steps: [
        { title: "Step 01 - Immediate: Document Everything", desc: "Write down all timelines and gather digital or physical evidence immediately." },
        { title: "Step 02 - Secondary: Send Legal Notice", desc: "A formal demand notice usually resolves the issue without needing to approach the court." }
      ]
    });
  }
}
