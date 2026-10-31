import { NextResponse } from "next/server";

const DEEPGRAM_API_KEY =
  process.env.DEEPGRAM_API_KEY || "82c68da634d19c7149b3a4c2742f0c57e6beb0aa";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const cleanText = String(text || "Welcome to Investra AI Mentor.")
      .replace(/[*#_`]/g, "")
      .slice(0, 650);

    const dgRes = await fetch(
      "https://api.deepgram.com/v1/speak?model=aura-asteria-en",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleanText }),
      }
    );

    if (!dgRes.ok) {
      return NextResponse.json(
        { ok: false, fallbackBrowserSpeech: true },
        { status: 200 }
      );
    }

    const audioBuffer = await dgRes.arrayBuffer();
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, fallbackBrowserSpeech: true },
      { status: 200 }
    );
  }
}
