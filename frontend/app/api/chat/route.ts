import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are NyayaMitra AI, a highly specialized Legal First-Response Assistant for Indian citizens (First-Generation Litigants).

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

    const apiKey = process.env.OPENAI_API_KEY;

    // HACKATHON FALLBACK: If no API key is set, use a mock response so the demo doesn't break.
    if (!apiKey) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const lastMessage = messages[messages.length - 1]?.content.toLowerCase();
      
      // Mock logic based on keywords
      let mockReply = "I am NyayaMitra AI. It seems your API key is not configured yet. However, I am ready to assist you with Tenant Rights, Consumer Disputes, and Police FIRs once activated. How can I help you today?";
      
      if (lastMessage.includes('police') || lastMessage.includes('fir')) {
         mockReply = "If the police are refusing to file an FIR, you have the right to file a 'Zero FIR' at any station. If they still refuse, under Section 154(3) of the CrPC, you can send your complaint in writing via registered post to the Superintendent of Police (SP). Can I help you draft this complaint?\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      } else if (lastMessage.includes('rent') || lastMessage.includes('deposit') || lastMessage.includes('landlord')) {
         mockReply = "Your landlord is legally required to return your security deposit, minus actual proven damages. Normal wear and tear cannot be deducted. If they refuse, you can send a formal legal notice. Would you like to use our Document Generator to create one?\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      } else if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
         mockReply = "Hello! I am NyayaMitra AI, your legal first-responder. Please describe your legal situation (e.g., landlord dispute, defective product, unpaid salary), and I will guide you on your rights.";
      } else if (lastMessage.includes('code') || lastMessage.includes('math') || lastMessage.includes('weather')) {
         mockReply = "I specialize strictly in legal first-response and Indian law. I cannot assist with that. Do you have a legal issue I can help you with?";
      }

      return NextResponse.json({
        id: "mock-id",
        role: "assistant",
        content: mockReply
      });
    }

    // REAL OPENAI INTEGRATION
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Can upgrade to gpt-4o for production
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from OpenAI');
    }

    const data = await response.json();
    return NextResponse.json({
      role: 'assistant',
      content: data.choices[0].message.content
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
