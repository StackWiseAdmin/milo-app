import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ reply: "Missing OpenRouter API key." }, { status: 500 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Milo, a warm, supportive mental health companion." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, Milo is having a hard time right now.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("❌ OpenRouter error:", err);
    return NextResponse.json({ reply: "Something went wrong with Milo's response." }, { status: 500 });
  }
}
