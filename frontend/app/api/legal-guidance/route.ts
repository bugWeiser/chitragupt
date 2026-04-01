import { NextResponse } from 'next/server';
import { loadKB, getSystemPrompt } from '@/lib/legal-ai';

export async function POST(req: Request) {
  try {
    const { category, description, city, amount, previousActions } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // Load Knowledge Base
    const kb = loadKB(category);
    
    // Construct System Prompt
    const systemPrompt = getSystemPrompt(kb, { city, amount, previousActions });
    
    // Construct User Prompt
    const userPrompt = `
SITUATION:
Location: ${city}
Amount Involved: ${amount}
Previous Actions: ${previousActions}

DETAILS:
${description}

Analyze the situation and provide a Legal First-Response Plan.
`;

    // Call Gemini
    const geminiPayload = {
      system_instruction: {
         parts: { text: systemPrompt }
      },
      contents: [{
         role: 'user',
         parts: [{ text: userPrompt }]
      }],
      generationConfig: {
         temperature: 0.3,
         response_mime_type: "application/json"
      }
    };

    if (!apiKey) {
      // Return a structured Mock response for demo purposes
      console.warn("GEMINI_API_KEY is not set. Returning mock response.");
      return NextResponse.json({
        "situation_summary": "Your landlord is refusing to return your security deposit.",
        "is_legal_or_illegal": "ILLEGAL",
        "your_rights": [
          "You are entitled to the full refund of your security deposit minus actual proven damages.",
          "The landlord has no right to withhold your deposit for normal wear and tear."
        ],
        "action_plan": [
          { "step": 1, "action": "Send a formal Legal Notice via WhatsApp or Email.", "timeline": "TODAY", "document_needed": "legal_notice" },
          { "step": 2, "action": "Wait for 15 days for a response from the landlord.", "timeline": "Next 15 days", "document_needed": "none" },
          { "step": 3, "action": "File a case in the District Consumer Disputes Redressal Commission.", "timeline": "After 15 days", "document_needed": "consumer_complaint" }
        ],
        "relevant_laws": [
          { "act": "Bharatiya Nyaya Sanhita, 2023", "section": "316", "what_it_says": "Criminal breach of trust covers dishonest retention of your property with bad intent." },
          { "act": "Rent Control Act", "section": "Local State Law", "what_it_says": "Landlords must return security deposit within a specified period of you vacating the house." }
        ],
        "disclaimer": "This is general legal information, not advice."
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.error?.message || 'Failed to fetch from Gemini API');
    }

    const data = await response.json();
    const result = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "{}");

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Legal Guidance API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
