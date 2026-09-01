import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required"
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY is not configured"
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are SoulMatch AI.

Create a short, friendly and respectful icebreaker for a dating/matching app.

User information:
${message}

Return only one natural icebreaker.`
    });

    const reply = result.text?.trim();

    if (!reply) {
      return NextResponse.json(
        {
          success: false,
          error: "Gemini returned no response"
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error("SoulMatch AI error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "AI Icebreaker unavailable"
      },
      { status: 500 }
    );
  }
}