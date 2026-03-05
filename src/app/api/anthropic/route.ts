import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt, model, max_tokens } = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing ANTHROPIC_API_KEY" },
        { status: 500 }
      );
    }

    const body: Record<string, unknown> = {
      model: model ?? "claude-sonnet-4-20250514",
      max_tokens: max_tokens ?? 1000,
      messages,
    };

    if (systemPrompt) {
      body.system = systemPrompt;
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reach Anthropic", detail: String(error) },
      { status: 500 }
    );
  }
}
