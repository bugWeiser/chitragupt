import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are Chitragupt AI, a highly specialized Legal First-Response Assistant for Indian citizens (First-Generation Litigants).

CRITICAL INSTRUCTIONS:
1. You MUST ONLY answer questions related to Indian Law, Tenant Rights, Consumer Rights, Workplace Disputes, Filing FIRs, and basic civil/criminal procedures.
2. If the user asks about ANY outside topic (coding, math, general trivia, weather, casual chat), you MUST politely decline and steer the conversation back to legal aid.
3. Example decline: "I specialize strictly in legal first-response and Indian law. I cannot assist with that. Do you have a legal issue I can help you with?"
4. Your tone must be empathetic, authoritative, and simple to understand. Avoid extreme legal jargon where plain words work.
5. ALWAYS add a disclaimer at the end of your advice: "*Disclaimer: This is AI-generated guidance, not formal legal advice.*"
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is empty" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ 
        role: 'assistant', 
        content: "I apologize, but my core AI engine is currently in transit. Please contact the administrator to provide the GEMINI_API_KEY in the environment settings. (Demo fallback: I am ready to assist with FIR and Tenant rights once activated!)" 
      });
    }

    const lastMessages = messages.slice(-10); // Keep context small for 1.5 Flash

    // REAL GEMINI FLASH 1.5 INTEGRATION
    const geminiPayload = {
      contents: lastMessages.map((m: any) => ({
         role: m.role === 'assistant' ? 'model' : 'user',
         parts: [{ text: m.content }]
      })),
      system_instruction: {
         parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
         temperature: 0.3,
         topP: 0.8,
         topK: 40,
         maxOutputTokens: 1024,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      throw new Error(data.error?.message || 'Failed to fetch from Gemini API');
    }

    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that.";

    return NextResponse.json({
      role: 'assistant',
      content: botText
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      role: 'assistant',
      content: "I'm having trouble connecting to my legal database right now. Please try again in a moment. (Error: " + error.message + ")"
    });
  }
}

