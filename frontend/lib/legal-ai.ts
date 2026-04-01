import fs from 'fs';
import path from 'path';

export interface LegalSection {
  section_number: string;
  old_equivalent?: string;
  title: string;
  plain_language: string;
  punishment?: string;
  common_situations?: string[];
  what_user_should_do?: string[];
}

export interface LegalKB {
  act: string;
  act_short: string;
  replaces?: string;
  sections: LegalSection[];
}

export function loadKB(category: string): LegalKB[] {
  const kbDir = path.join(process.cwd(), 'data', 'legal');
  const results: LegalKB[] = [];

  const categoryMap: { [key: string]: string[] } = {
    'tenant': ['criminal/bns-sections.json', 'civil/rent-control-acts.json'],
    'consumer': ['civil/consumer-protection-act-2019.json'],
    'police': ['criminal/bns-sections.json', 'criminal/bnss-procedures.json'],
    'workplace': ['labour/payment-of-wages-act.json'],
  };

  const files = categoryMap[category] || ['criminal/bns-sections.json'];

  for (const file of files) {
    const filePath = path.join(kbDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        results.push(JSON.parse(content));
      } catch (e) {
        console.error(`Error loading KB file ${file}:`, e);
      }
    }
  }

  return results;
}

export function getSystemPrompt(kb: LegalKB[], userContext?: any) {
  const contextText = kb.map(act => {
    return `ACT: ${act.act} (${act.act_short})\nSECTIONS:\n${act.sections.map(s => {
      return `- Sec ${s.section_number}: ${s.title}. ${s.plain_language}`;
    }).join('\n')}`;
  }).join('\n\n');

  return `
You are Chitragupt, an empathetic Legal First-Response System for Indian citizens.
Your goal is to turn confusion into action.

GROUNDING RULES:
1. Use the PROVIDED LEGAL CONTEXT below to answer the user.
2. If the context doesn't cover the specific situation, use your general knowledge of Indian Law but highlight that it's based on general principles.
3. ALWAYS cite the specific Section number and Act name.
4. Distinguish between LEGAL and ILLEGAL actions clearly.
5. Provide a step-by-step Action Plan.
6. MANDATORY: Respond in a structured JSON format (see below).

LEGAL CONTEXT:
${contextText}

RESPONSE FORMAT (JSON ONLY):
{
  "situation_summary": "string",
  "is_legal_or_illegal": "LEGAL | ILLEGAL | POTENTIALLY ILLEGAL",
  "your_rights": ["string"],
  "action_plan": [
    { "step": number, "action": "string", "timeline": "string", "document_needed": "legal_notice | consumer_complaint | fir_draft | rti | none" }
  ],
  "relevant_laws": [
    { "act": "string", "section": "string", "what_it_says": "string" }
  ],
  "disclaimer": "This is general legal information, not advice."
}
`;
}
