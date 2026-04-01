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
      console.warn("GEMINI_API_KEY is missing. Using advanced mock fallback for demonstration.");
      
      const lastUserMsg = messages.filter((m: any) => m.role === 'user').pop()?.content?.toLowerCase() || "";
      let mockResponse = "I understand you have a legal concern. Please provide more details so I can assist you better based on Indian Law.";

      if (lastUserMsg.includes('tenant') || lastUserMsg.includes('rent') || lastUserMsg.includes('deposit')) {
        mockResponse = "Under the Rent Control Act, a landlord cannot unreasonably withhold your security deposit or evict you without due process. I recommend sending a formal legal notice demanding the deposit within 15 days. Would you like me to guide you on drafting the notice?\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      } else if (lastUserMsg.includes('fir') || lastUserMsg.includes('police')) {
        mockResponse = "If the police refuse to register an FIR for a cognizable offense, you have the right under Section 154(3) of the CrPC (or corresponding BNS section) to send the complaint in writing to the Superintendent of Police (SP). If no action is taken, you can approach a Magistrate under Section 156(3). Stay calm and document everything.\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      } else if (lastUserMsg.includes('salary') || lastUserMsg.includes('work') || lastUserMsg.includes('employer')) {
        mockResponse = "Non-payment of salary is a serious violation. You can file a complaint with the Labour Commissioner or send a legal notice to your employer for 'Criminal Breach of Trust' under the applicable labor laws. It's often resolved quickly once a formal notice is received.\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      } else if (lastUserMsg.includes('fraud') || lastUserMsg.includes('scam') || lastUserMsg.includes('money')) {
        mockResponse = "For online or financial fraud, immediately report the incident on the National Cyber Crime portal (cybercrime.gov.in) or call 1930. Inform your bank immediately to block the transaction. Time is critical for recovering funds.\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      } else {
        mockResponse = "Based on Indian Law, to address this issue properly, we first need to establish formal communication with the other party. I suggest identifying the core legal right being violated (e.g., Consumer Protection, Indian Contract Act) and sending a legal notice.\n\n*Disclaimer: This is AI-generated guidance, not formal legal advice.*";
      }
      
      // Artificial delay to make it feel like a real AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      return NextResponse.json({ 
        role: 'assistant', 
        content: mockResponse 
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

