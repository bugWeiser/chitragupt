import { NextResponse } from "next/server";
import { getHybridNews } from "@/lib/providers/newsProvider";

export async function GET() {
  try {
    const data = await getHybridNews();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
